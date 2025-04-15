
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface FeedbackFormProps {
  productId: number;
  productName: string;
  artistName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFeedbackSubmitted?: () => void;
}

type FeedbackFormValues = {
  rating: number;
  comment: string;
};

const FeedbackForm = ({
  productId,
  productName,
  artistName,
  open,
  onOpenChange,
  onFeedbackSubmitted,
}: FeedbackFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const handleRatingClick = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  const onSubmit = async (data: FeedbackFormValues) => {
    if (data.rating === 0) {
      toast({
        title: "Please add a rating",
        description: "You must select a star rating to submit feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, we would use Supabase to submit the feedback
      // For now, we'll simulate a successful submission with a timeout
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example of how you would submit to Supabase when connected:
      // const { error } = await supabase
      //   .from('product_feedback')
      //   .insert([
      //     { 
      //       product_id: productId,
      //       user_id: 'current-user-id', // would come from auth
      //       rating: data.rating,
      //       comment: data.comment 
      //     }
      //   ]);
      
      // if (error) throw error;

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      
      form.reset();
      setRating(0);
      onOpenChange(false);
      
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const activeRating = hoveredRating || rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className="text-gray-300 hover:text-yellow-400 focus:outline-none"
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRatingClick(i)}
        >
          <Star 
            className={`h-8 w-8 ${i <= activeRating ? "fill-yellow-400 text-yellow-400" : ""}`}
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Purchase</DialogTitle>
          <DialogDescription>
            Share your thoughts about {productName} by {artistName}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <div className="flex space-x-1" {...field}>
                      {renderStars()}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select how many stars you would rate this product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell others what you think about this product..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your review helps other shoppers make informed decisions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
