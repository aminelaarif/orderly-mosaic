import { Order, OrderAnalytics } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OrderAnalyticsProps {
  orders: Order[];
}

const OrderAnalytics = ({ orders }: OrderAnalyticsProps) => {
  const calculateAnalytics = (orders: Order[]): OrderAnalytics => {
    const analytics: OrderAnalytics = {
      totalOrders: orders.length,
      averageOrderValue: 0,
      popularItems: [],
      ordersByStatus: {
        pending: 0,
        preparing: 0,
        ready: 0,
        completed: 0,
        cancelled: 0,
        in_progress: 0,
      },
      ordersByType: {
        dine_in: 0,
        takeout: 0,
        delivery: 0,
        online: 0,
      },
    };

    // Calculate average order value
    const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
    analytics.averageOrderValue = totalValue / orders.length;

    // Count orders by status and type
    orders.forEach((order) => {
      analytics.ordersByStatus[order.status]++;
      analytics.ordersByType[order.orderType]++;
    });

    // Calculate popular items
    const itemCounts = new Map<string, number>();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const count = (itemCounts.get(item.name) || 0) + item.quantity;
        itemCounts.set(item.name, count);
      });
    });

    analytics.popularItems = Array.from(itemCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return analytics;
  };

  const analytics = calculateAnalytics(orders);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalOrders}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${analytics.averageOrderValue.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Popular Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.popularItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAnalytics;