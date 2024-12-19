import { Order } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface OrderCardProps {
  order: Order;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-pink-100 text-pink-800";
    case "preparing":
      return "bg-amber-100 text-amber-800";
    case "ready":
      return "bg-emerald-100 text-emerald-800";
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
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
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
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), "h:mm:ss a")}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Items:</p>
            <ul className="text-gray-600">
              {order.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Total:</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;