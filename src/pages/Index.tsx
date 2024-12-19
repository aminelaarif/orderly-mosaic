import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import OrderCard from "@/components/OrderCard";
import OrderAnalytics from "@/components/OrderAnalytics";
import NewOrderForm from "@/components/NewOrderForm";
import { mockOrders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/lib/types";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const handleNewOrder = (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: (orders.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (priceSort === "highest") return b.total - a.total;
      if (priceSort === "lowest") return a.total - b.total;
      return 0;
    });

  const activeOrders = filteredOrders.filter(
    (order) => !['completed', 'cancelled'].includes(order.status)
  );
  
  const completedOrders = filteredOrders.filter(
    (order) => ['completed', 'cancelled'].includes(order.status)
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setIsNewOrderOpen(true)}
        >
          New Order
        </Button>
      </div>

      <NewOrderForm 
        open={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onSubmit={handleNewOrder}
      />

      <OrderAnalytics orders={orders} />

      <div className="flex justify-between items-center gap-4 my-8">
        <SearchBar onSearch={setSearchQuery} />
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="highest">Highest price</SelectItem>
              <SelectItem value="lowest">Lowest price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Active Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;