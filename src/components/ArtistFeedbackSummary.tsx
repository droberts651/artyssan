
import { Star } from "lucide-react";
import { FeedbackItem } from "./ProductFeedback";

interface ArtistFeedbackSummaryProps {
  artistName: string;
  feedback: FeedbackItem[];
}

const ArtistFeedbackSummary = ({ artistName, feedback }: ArtistFeedbackSummaryProps) => {
  if (!feedback || feedback.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No reviews yet
      </div>
    );
  }

  const averageRating = 
    feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 half-filled" />
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
    <div className="mt-2">
      <div className="flex items-center gap-1">
        <div className="flex">
          {renderStars(averageRating)}
        </div>
        <span className="text-sm text-gray-600 ml-1">
          ({feedback.length} {feedback.length === 1 ? "review" : "reviews"})
        </span>
      </div>
    </div>
  );
};

export default ArtistFeedbackSummary;
