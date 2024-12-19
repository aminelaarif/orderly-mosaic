import { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "John Smith",
    orderType: "dine_in",
    status: "pending",
    items: [
      {
        id: "item_1",
        name: "Margherita Pizza",
        quantity: 1,
        price: 15.99,
      },
      {
        id: "item_2",
        name: "Caesar Salad",
        quantity: 1,
        price: 8.99,
      }
    ],
    total: 24.98,
    createdAt: "2024-02-14T14:30:00Z",
    updatedAt: "2024-02-14T14:30:00Z",
    customerEmail: "john@example.com",
    review: {
      rating: 4,
      comment: "Great food!"
    }
  },
  {
    id: "ORD002",
    customerName: "Emma Wilson",
    orderType: "takeout",
    status: "preparing",
    items: [
      {
        id: "item_3",
        name: "Pasta Carbonara",
        quantity: 2,
        price: 16.99,
      },
      {
        id: "item_4",
        name: "Tiramisu",
        quantity: 1,
        price: 7.99,
      }
    ],
    total: 41.97,
    createdAt: "2024-02-14T14:25:00Z",
    updatedAt: "2024-02-14T14:25:00Z",
    customerPhone: "555-0123"
  },
  {
    id: "ORD003",
    customerName: "Michael Brown",
    orderType: "delivery",
    status: "completed",
    items: [
      {
        id: "item_5",
        name: "Chicken Curry",
        quantity: 1,
        price: 18.99,
      },
      {
        id: "item_6",
        name: "Naan Bread",
        quantity: 2,
        price: 3.99,
      }
    ],
    total: 26.97,
    createdAt: "2024-02-14T14:20:00Z",
    updatedAt: "2024-02-14T14:20:00Z",
    customerEmail: "michael@example.com",
    customerPhone: "555-0124",
    review: {
      rating: 5,
      comment: "Excellent service and food!"
    }
  },
  {
    id: "ORD004",
    customerName: "Sarah Johnson",
    orderType: "online",
    status: "in_progress",
    items: [
      {
        id: "item_7",
        name: "Margherita Pizza",
        quantity: 2,
        price: 15.99,
      },
      {
        id: "item_8",
        name: "Garlic Bread",
        quantity: 1,
        price: 4.99,
      }
    ],
    total: 36.97,
    createdAt: "2024-02-14T14:15:00Z",
    updatedAt: "2024-02-14T14:15:00Z",
    customerEmail: "sarah@example.com"
  }
];