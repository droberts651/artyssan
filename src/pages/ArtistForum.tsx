
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  MessageSquarePlus,
  User,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Loader2,
  ArrowUpRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define types
type ForumPost = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_question: boolean;
  parent_id: string | null;
  author_id: string | null;
  author?: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
  replies?: ForumPost[];
};

const ArtistForum = () => {
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [openNewPostDialog, setOpenNewPostDialog] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<ForumPost | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("forum_posts")
        .select(`
          *,
          author:profiles(username, full_name, avatar_url)
        `)
        .is("parent_id", null)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Now fetch replies for each post
      if (data) {
        const postsWithReplies = await Promise.all(
          data.map(async (post) => {
            const { data: replies, error: repliesError } = await supabase
              .from("forum_posts")
              .select(`
                *,
                author:profiles(username, full_name, avatar_url)
              `)
              .eq("parent_id", post.id)
              .order("created_at", { ascending: true });
            
            if (repliesError) throw repliesError;
            
            return {
              ...post,
              replies: replies || []
            };
          })
        );
        
        setPosts(postsWithReplies);
      }
    } catch (error: any) {
      console.error("Error fetching forum posts:", error);
      toast({
        title: "Error loading forum",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Incomplete form",
        description: "Please provide both title and content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("forum_posts")
        .insert({
          title: newPostTitle,
          content: newPostContent,
          author_id: user?.id,
          is_question: true
        });
      
      if (error) throw error;
      
      toast({
        title: "Post created",
        description: "Your question has been posted to the forum.",
      });
      
      setNewPostTitle("");
      setNewPostContent("");
      setOpenNewPostDialog(false);
      fetchPosts();
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostReply = async (parentId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("forum_posts")
        .insert({
          title: "Re: " + posts.find(p => p.id === parentId)?.title,
          content: replyContent,
          author_id: user?.id,
          parent_id: parentId,
          is_question: false
        });
      
      if (error) throw error;
      
      toast({
        title: "Reply posted",
        description: "Your answer has been added to the discussion.",
      });
      
      setReplyContent("");
      setActiveReplyId(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error posting reply:", error);
      toast({
        title: "Error posting reply",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPost = async () => {
    if (!editingPost) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("forum_posts")
        .update({
          title: editingPost.title,
          content: editingPost.content,
          updated_at: new Date().toISOString()
        })
        .eq("id", editingPost.id);
      
      if (error) throw error;
      
      toast({
        title: "Post updated",
        description: "Your changes have been saved.",
      });
      
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error updating post:", error);
      toast({
        title: "Error updating post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("forum_posts")
        .delete()
        .eq("id", postId);
      
      if (error) throw error;
      
      toast({
        title: "Post deleted",
        description: "The post has been removed.",
      });
      
      fetchPosts();
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-craft-background flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#19747E]" />
            <p className="mt-4 text-[#19747E]">Loading forum discussions...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#19747E]">Artist Forum</h1>
              <p className="text-gray-600 mt-1">Ask questions and share advice with other artists</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Dialog open={openNewPostDialog} onOpenChange={setOpenNewPostDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#19747E] hover:bg-[#19747E]/90">
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Question</DialogTitle>
                    <DialogDescription>
                      Share your question with the artist community
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="post-title">Title</Label>
                      <Input
                        id="post-title"
                        placeholder="What's your question about?"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="post-content">Description</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Provide details about your question..."
                        rows={6}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenNewPostDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleCreatePost}
                      disabled={isSubmitting}
                      className="bg-[#19747E] hover:bg-[#19747E]/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Question"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button asChild variant="outline">
                <Link to="/artist/analytics">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Forum content */}
          <div className="space-y-6">
            {posts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No discussions yet</h3>
                  <p className="text-gray-500 mb-6">
                    Be the first to start a discussion in the artist community
                  </p>
                  <Button 
                    onClick={() => setOpenNewPostDialog(true)}
                    className="bg-[#19747E] hover:bg-[#19747E]/90"
                  >
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Ask a Question
                  </Button>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="bg-[#F3F8F9] pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-[#19747E]">{post.title}</CardTitle>
                      
                      {post.author_id === user?.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingPost(post)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <div className="flex items-center mr-4">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {post.author?.full_name || post.author?.username || "Anonymous"}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {formatDate(post.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{post.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start border-t pt-4 pb-0">
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveReplyId(activeReplyId === post.id ? null : post.id)}
                      className="mb-2"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {activeReplyId === post.id ? "Cancel Reply" : "Reply"}
                    </Button>
                    
                    {activeReplyId === post.id && (
                      <div className="w-full space-y-3 mb-4">
                        <Textarea
                          placeholder="Write your answer here..."
                          rows={4}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={() => handlePostReply(post.id)}
                            disabled={isSubmitting}
                            className="bg-[#19747E] hover:bg-[#19747E]/90"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                              </>
                            ) : (
                              "Post Answer"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies */}
                    {post.replies && post.replies.length > 0 && (
                      <div className="w-full mt-2">
                        <Separator className="my-4" />
                        <h4 className="font-medium text-sm text-gray-500 mb-4 flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {post.replies.length} {post.replies.length === 1 ? "Answer" : "Answers"}
                        </h4>
                        <div className="space-y-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="border-l-2 border-[#A9D6E5] pl-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center text-sm mb-2">
                                  <span className="font-medium">
                                    {reply.author?.full_name || reply.author?.username || "Anonymous"}
                                  </span>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-gray-500 text-xs">
                                    {formatDate(reply.created_at)}
                                  </span>
                                </div>
                                
                                {reply.author_id === user?.id && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-6 w-6 p-0">
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setEditingPost(reply)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDeletePost(reply.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                              <div className="prose max-w-none text-sm">
                                <p className="whitespace-pre-line">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Edit post dialog */}
      {editingPost && (
        <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogDescription>
                Make changes to your post
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {!editingPost.parent_id && (
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="mt-1"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  rows={6}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingPost(null)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleEditPost}
                disabled={isSubmitting}
                className="bg-[#19747E] hover:bg-[#19747E]/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </>
  );
};

export default ArtistForum;
