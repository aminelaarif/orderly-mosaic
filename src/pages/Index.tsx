import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import OrderCard from "@/components/OrderCard";
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
  const [sortOrder, setSortOrder] = useState("none");
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    (order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === "all" || order.status === statusFilter)
  );

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
        <Button className="bg-orange-500 hover:bg-orange-600">New Order</Button>
      </div>

      <div className="flex justify-between items-center gap-4 mb-8">
        <SearchBar onSearch={setSearchQuery} />
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="No sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
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