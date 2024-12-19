import { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: "ord_1",
    customerName: "John Smith",
    orderType: "dine_in",
    status: "completed",
    items: [
      {
        id: "item_1",
        name: "Margherita Pizza",
        quantity: 2,
        price: 15.99,
        specialRequests: "Extra cheese"
      },
      {
        id: "item_2",
        name: "Caesar Salad",
        quantity: 1,
        price: 8.99
      }
    ],
    total: 40.97,
    createdAt: "2024-04-10T14:30:00Z",
    updatedAt: "2024-04-10T15:00:00Z"
  },
  {
    id: "ord_2",
    customerName: "Sarah Johnson",
    orderType: "delivery",
    status: "in_progress",
    items: [
      {
        id: "item_3",
        name: "Chicken Wings",
        quantity: 2,
        price: 12.99
      }
    ],
    total: 25.98,
    createdAt: "2024-04-10T14:45:00Z",
    updatedAt: "2024-04-10T14:45:00Z"
  },
  {
    id: "ord_3",
    customerName: "Mike Wilson",
    orderType: "takeout",
    status: "cancelled",
    items: [
      {
        id: "item_4",
        name: "Burger Combo",
        quantity: 1,
        price: 16.99
      }
    ],
    total: 16.99,
    createdAt: "2024-04-10T13:15:00Z",
    updatedAt: "2024-04-10T13:30:00Z"
  }
];