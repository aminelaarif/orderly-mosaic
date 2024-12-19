import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import OrderTable from "@/components/OrderTable";
import OrderModal from "@/components/OrderModal";
import { mockOrders } from "@/lib/mock-data";
import { Order } from "@/lib/types";

const Index = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = mockOrders.filter((order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <OrderTable
        orders={filteredOrders}
        onOrderClick={setSelectedOrder}
      />

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Index;