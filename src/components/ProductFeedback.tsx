
import { Star, StarHalf, User } from "lucide-react";

export interface FeedbackItem {
  id: number;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductFeedbackProps {
  feedback: FeedbackItem[];
  showTitle?: boolean;
}

const ProductFeedback = ({ feedback, showTitle = true }: ProductFeedbackProps) => {
  if (!feedback || feedback.length === 0) {
    return null;
  }

  const averageRating = 
    feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;
  
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i - rating < 1) {
        stars.push(
          <StarHalf key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="flex items-center gap-1">
            {renderStars(averageRating)}
            <span className="ml-1 text-sm text-gray-600">
              ({feedback.length} {feedback.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <span className="font-medium">{item.userName}</span>
              </div>
              <div className="flex gap-1">
                {renderStars(item.rating)}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{item.comment}</p>
            <p className="text-gray-400 text-xs mt-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeedback;
