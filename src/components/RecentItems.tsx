import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
const items = [{
  id: 1,
  name: "Handcrafted Ceramic Mug",
  artist: "Emma Thompson",
  price: 28.00,
  image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  category: "Ceramics"
}, {
  id: 2,
  name: "Hand-Woven Wall Hanging",
  artist: "Aisha Johnson",
  price: 75.00,
  image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  category: "Textile Art"
}, {
  id: 3,
  name: "Wooden Serving Board",
  artist: "Marcus Rivera",
  price: 45.00,
  image: "https://images.unsplash.com/photo-1605433247501-698405495b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
  category: "Woodworking"
}, {
  id: 4,
  name: "Silver Leaf Earrings",
  artist: "David Chen",
  price: 32.00,
  image: "https://images.unsplash.com/photo-1630019852942-7a3592370ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  category: "Jewelry"
}, {
  id: 5,
  name: "Hand-Printed Linen Scarf",
  artist: "Aisha Johnson",
  price: 38.00,
  image: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80",
  category: "Textile Art"
}, {
  id: 6,
  name: "Stoneware Vase",
  artist: "Emma Thompson",
  price: 68.00,
  image: "https://images.unsplash.com/photo-1612196319128-2e51846e0e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80",
  category: "Ceramics"
}];
const RecentItems = () => {
  return <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Recently Added</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our newest handcrafted items from talented local artisans.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="relative h-64 overflow-hidden group">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button size="icon" variant="secondary" className="rounded-full bg-white text-craft-navy hover:bg-white/90">
                      <Heart size={18} />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full bg-craft-terracotta text-white hover:bg-craft-terracotta/90">
                      <ShoppingCart size={18} />
                    </Button>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-craft-sage text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-craft-navy hover:text-craft-terracotta transition-colors duration-300">
                  <a href="#">{item.name}</a>
                </h3>
                <p className="text-gray-600 text-sm">by {item.artist}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-craft-navy font-semibold">${item.price.toFixed(2)}</span>
                  <Button variant="ghost" size="sm" className="text-craft-navy hover:text-craft-terracotta">
                    View Details
                  </Button>
                </div>
              </div>
            </div>)}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-primary">Browse All Items</Button>
        </div>
      </div>
    </section>;
};
export default RecentItems;