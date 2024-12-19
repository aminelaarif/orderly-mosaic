import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order, OrderItem } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderModal = ({ order, onClose }: OrderModalProps) => {
  if (!order) return null;

  const formatOrderType = (type: string) => {
    return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{order.customerName}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(order.createdAt), "PPpp")}
              </p>
            </div>
            <Badge variant="secondary">
              {formatOrderType(order.orderType)}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Items</h4>
            {order.items.map((item: OrderItem) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{item.quantity}x</span> {item.name}
                  {item.specialRequests && (
                    <p className="text-gray-500 text-xs mt-0.5">
                      Note: {item.specialRequests}
                    </p>
                  )}
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;