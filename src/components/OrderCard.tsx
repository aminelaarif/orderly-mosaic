import { Order } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Clock, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderCardProps {
  order: Order;
  onStatusChange?: (orderId: string, newStatus: Order['status']) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-pink-100 text-pink-800";
    case "preparing":
      return "bg-amber-100 text-amber-800";
    case "ready":
      return "bg-emerald-100 text-emerald-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getOrderTypeColor = (type: string) => {
  switch (type) {
    case "dine_in":
      return "bg-red-50 text-red-700";
    case "takeout":
      return "bg-stone-100 text-stone-700";
    case "delivery":
      return "bg-purple-50 text-purple-700";
    case "online":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderCard = ({ order, onStatusChange }: OrderCardProps) => {
  const { toast } = useToast();

  const handleStatusChange = (newStatus: Order['status']) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
      toast({
        title: "Order Status Updated",
        description: `Order #${order.id} is now ${newStatus}`,
      });
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow = {
      pending: 'in_progress',
      in_progress: 'preparing',
      preparing: 'ready',
      ready: 'completed'
    } as const;

    return statusFlow[currentStatus as keyof typeof statusFlow] || null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex-row justify-between items-center pb-2">
        <div className="flex items-center gap-3">
          <span className="font-medium">{order.id}</span>
          <Badge 
            variant="secondary" 
            className={cn(getOrderTypeColor(order.orderType))}
          >
            {order.orderType.split("_").map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(" ")}
          </Badge>
        </div>
        <Badge 
          variant="secondary"
          className={cn(getStatusColor(order.status))}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{order.customerName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {format(new Date(order.createdAt), "h:mm:ss a")}
            </div>
            {order.customerPhone && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Phone className="h-4 w-4" />
                {order.customerPhone}
              </div>
            )}
            {order.customerEmail && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Mail className="h-4 w-4" />
                {order.customerEmail}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Items:</p>
            <ul className="text-gray-600">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total:</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>

          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <div className="flex gap-2 pt-2">
              {getNextStatus(order.status) && (
                <Button 
                  className="w-full"
                  onClick={() => handleStatusChange(getNextStatus(order.status)!)}
                >
                  Mark as {getNextStatus(order.status)}
                </Button>
              )}
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => handleStatusChange('cancelled')}
              >
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;