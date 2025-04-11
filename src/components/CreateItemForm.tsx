
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, Plus, Image, Film } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(1000),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  shippingCost: z.coerce.number().min(0, { message: "Shipping cost must be a non-negative number" }),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be a positive whole number" }),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateItemForm = () => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [video, setVideo] = useState<{ file: File; preview: string } | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      shippingCost: 0,
      quantity: 1,
      category: "",
      tags: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Here you would normally handle form submission to your backend
    console.log("Form data:", data);
    console.log("Images:", images);
    console.log("Video:", video);

    // Show success toast and redirect
    toast({
      title: "Item created successfully",
      description: "Your new listing has been added",
    });

    // Close the modal/sheet (handled by parent component)
    // Navigate or refresh listings
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideo({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const removeVideo = () => {
    if (video) {
      URL.revokeObjectURL(video.preview);
      setVideo(null);
    }
  };

  const categories = [
    "Ceramics",
    "Textile Art",
    "Woodworking",
    "Jewelry",
    "Paper Crafts",
    "Glass Art",
    "Metalwork",
    "Leather Goods",
    "Candles & Soaps",
    "Other"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter item title" {...field} />
              </FormControl>
              <FormDescription>
                Give your item a descriptive name that will help buyers find it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image upload section */}
        <div className="space-y-2">
          <FormLabel>Images</FormLabel>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="relative aspect-square rounded overflow-hidden border border-gray-200"
              >
                <img 
                  src={img.preview} 
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            {images.length < 5 && (
              <label className="border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-gray-300 transition-colors">
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <Image size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <FormDescription>
            Upload up to 5 high-quality images. First image will be the cover.
          </FormDescription>
        </div>

        {/* Video upload section */}
        <div className="space-y-2">
          <FormLabel>Product Video (Optional)</FormLabel>
          {video ? (
            <div className="relative rounded overflow-hidden border border-gray-200">
              <video 
                src={video.preview} 
                controls 
                className="w-full h-auto max-h-40 object-contain bg-gray-50"
              />
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center h-32 cursor-pointer hover:border-gray-300 transition-colors">
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Film size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 mb-1">Add a short video of your item</span>
                <span className="text-xs text-gray-500">(Max 30 seconds, 20MB)</span>
              </div>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
              />
            </label>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your item in detail..." 
                  className="min-h-32" 
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include details like materials, dimensions, and special features.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0.01" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Cost ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Available</FormLabel>
                <FormControl>
                  <Input type="number" min="1" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    {...field}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input 
                  placeholder="handmade, sustainable, vintage, etc. (comma separated)" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Add relevant tags to help buyers find your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#19747E] hover:bg-[#19747E]/90">
            Create Listing
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateItemForm;
