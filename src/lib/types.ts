export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled' | 'in_progress';

export type OrderType = 'dine_in' | 'takeout' | 'delivery' | 'online';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialRequests?: string;
}

export interface Order {
  id: string;
  customerName: string;
  orderType: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  estimatedReadyTime?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  review?: {
    rating: number;
    comment?: string;
  };
}

export interface OrderAnalytics {
  totalOrders: number;
  averageOrderValue: number;
  popularItems: { name: string; count: number }[];
  ordersByStatus: Record<OrderStatus, number>;
  ordersByType: Record<OrderType, number>;
}