
import { Palette, Brush, Scissors, Gem, Shirt, Wheat, Utensils, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Painting",
    icon: <Palette className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 2,
    name: "Jewelry",
    icon: <Gem className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 3,
    name: "Textiles",
    icon: <Scissors className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 4,
    name: "Ceramics",
    icon: <Utensils className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 5,
    name: "Apparel",
    icon: <Shirt className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 6,
    name: "Woodwork",
    icon: <Wheat className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 7,
    name: "Illustration",
    icon: <Brush className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
  {
    id: 8,
    name: "Bookbinding",
    icon: <BookOpen className="w-8 h-8 mb-3 text-[#19747E]" />,
    color: "bg-[#D1E8E2]",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Browse By Category</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our wide range of handcrafted items across different categories, each made with love and skill by local artisans.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.name}`}
              className={`${category.color} rounded-lg p-4 text-center card-hover cursor-pointer hover:bg-[#A9D6E5] transition-colors`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {category.icon}
                <h3 className="font-medium text-[#19747E]">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/categories" className="btn-primary inline-block">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
