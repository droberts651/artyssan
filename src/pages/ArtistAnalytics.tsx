
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Edit,
  Eye,
  Package,
  PieChart,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define types for our data
type Item = {
  id: string;
  title: string;
  price: number;
  view_count: number;
  category: string | null;
  image_url: string | null;
  quantity: number;
  status: string | null;
};

type Sale = {
  id: string;
  item_id: string | null;
  quantity: number;
  total_amount: number;
  sale_date: string;
  item_title?: string;
};

type MonthlySales = {
  month: string;
  revenue: number;
  orders: number;
};

const ArtistAnalytics = () => {
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch items
        const { data: itemsData, error: itemsError } = await supabase
          .from("items")
          .select("*")
          .eq("artist_id", user.id);

        if (itemsError) throw itemsError;
        
        if (itemsData) {
          setItems(itemsData);
          setTotalViews(itemsData.reduce((acc, item) => acc + (item.view_count || 0), 0));
        }

        // Fetch sales
        const { data: salesData, error: salesError } = await supabase
          .from("sales")
          .select(`
            id,
            item_id,
            quantity,
            total_amount,
            sale_date,
            items (title)
          `)
          .eq("artist_id", user.id)
          .order("sale_date", { ascending: false });

        if (salesError) throw salesError;
        
        if (salesData) {
          const processedSales = salesData.map(sale => ({
            ...sale,
            item_title: sale.items?.title || 'Unknown Item'
          }));
          
          setSales(processedSales);
          setTotalOrders(processedSales.length);
          setTotalRevenue(processedSales.reduce((acc, sale) => acc + (sale.total_amount || 0), 0));
          
          // Process monthly sales data
          const monthlyData = processMonthlyData(processedSales);
          setMonthlySales(monthlyData);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error loading data",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Process sales data into monthly format for charts
  const processMonthlyData = (sales: Sale[]): MonthlySales[] => {
    const monthlyMap = new Map<string, { revenue: number; orders: number }>();
    const today = new Date();
    
    // Initialize with the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthlyMap.set(monthYear, { revenue: 0, orders: 0 });
    }
    
    // Add sales data
    sales.forEach(sale => {
      const date = new Date(sale.sale_date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (monthlyMap.has(monthYear)) {
        const current = monthlyMap.get(monthYear)!;
        monthlyMap.set(monthYear, {
          revenue: current.revenue + sale.total_amount,
          orders: current.orders + 1
        });
      }
    });
    
    // Convert map to array for the chart
    return Array.from(monthlyMap).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      orders: data.orders
    }));
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-craft-background flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#19747E]" />
            <p className="mt-4 text-[#19747E]">Loading your dashboard...</p>
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
              <h1 className="text-3xl font-bold text-[#19747E]">Artist Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your items, views, and sales performance</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button asChild className="bg-[#19747E] hover:bg-[#19747E]/90">
                <Link to="/artist/listings">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Listings
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/artist/forum">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Artist Forum
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews}</div>
                <p className="text-xs text-muted-foreground">
                  Across all your items
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  From {totalOrders} orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalViews ? ((totalOrders / totalViews) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Views to purchase ratio
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="items" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="items">
                <Package className="mr-2 h-4 w-4" />
                Item Performance
              </TabsTrigger>
              <TabsTrigger value="sales">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Sales History
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            {/* Items Tab */}
            <TabsContent value="items" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Item Performance</CardTitle>
                  <CardDescription>
                    View and manage your listings sorted by popularity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-center">Views</TableHead>
                        <TableHead className="text-center">Inventory</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <Package className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                            <p className="text-gray-500 mb-4">You don't have any items yet</p>
                            <Button asChild className="bg-[#19747E] hover:bg-[#19747E]/90">
                              <Link to="/artist/listings">Add Your First Item</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        items
                          .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {item.image_url ? (
                                    <img 
                                      src={item.image_url} 
                                      alt={item.title} 
                                      className="w-10 h-10 object-cover rounded mr-3"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex items-center justify-center">
                                      <Package className="h-4 w-4 text-gray-400" />
                                    </div>
                                  )}
                                  <span className="line-clamp-1">{item.title}</span>
                                </div>
                              </TableCell>
                              <TableCell>{item.category || "Uncategorized"}</TableCell>
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center">
                                  <Eye className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                  {item.view_count || 0}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="text-center">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === "active" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {item.status || "Draft"}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/artist/items/edit/${item.id}`}>
                                    <Edit className="h-3.5 w-3.5 mr-1" />
                                    Edit
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sales Tab */}
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales History</CardTitle>
                  <CardDescription>
                    Recent orders and revenue details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            <ShoppingCart className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                            <p className="text-gray-500">No sales recorded yet</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        sales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell>
                              {new Date(sale.sale_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-medium">
                              {sale.item_title}
                            </TableCell>
                            <TableCell className="text-center">{sale.quantity}</TableCell>
                            <TableCell className="text-right">${sale.total_amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                    <CardDescription>
                      Your sales revenue over the past 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: any) => [`$${value}`, 'Revenue']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#19747E" 
                          activeDot={{ r: 8 }} 
                          name="Revenue"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Orders</CardTitle>
                    <CardDescription>
                      Number of orders received over the past 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#A9D6E5" name="Orders" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistAnalytics;
