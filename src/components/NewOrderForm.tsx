import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Order, OrderItem, OrderType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface NewOrderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void;
}

const NewOrderForm = ({ open, onClose, onSubmit }: NewOrderFormProps) => {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("online");
  const [items, setItems] = useState<OrderItem[]>([
    { id: "1", name: "", quantity: 1, price: 0 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || items.some(item => !item.name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    onSubmit({
      customerName,
      orderType,
      status: "pending",
      items,
      total,
    });

    setCustomerName("");
    setOrderType("online");
    setItems([{ id: "1", name: "", quantity: 1, price: 0 }]);
    onClose();
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: (items.length + 1).toString(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Order Type</Label>
            <Select value={orderType} onValueChange={(value: OrderType) => setOrderType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="dine_in">Dine In</SelectItem>
                <SelectItem value="takeout">Takeout</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Items</Label>
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <Input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                  className="w-20"
                  min="1"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                  className="w-24"
                  min="0"
                  step="0.01"
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderForm;