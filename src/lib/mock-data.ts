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
    total: 32.50,
    createdAt: "2024-02-14T14:30:00Z",
    updatedAt: "2024-02-14T14:30:00Z"
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
        quantity: 1,
        price: 16.99,
      },
      {
        id: "item_4",
        name: "Tiramisu",
        quantity: 1,
        price: 11.76,
      }
    ],
    total: 28.75,
    createdAt: "2024-02-14T14:25:00Z",
    updatedAt: "2024-02-14T14:25:00Z"
  },
  {
    id: "ORD003",
    customerName: "Michael Brown",
    orderType: "delivery",
    status: "ready",
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
        price: 4.99,
      },
      {
        id: "item_7",
        name: "Mango Lassi",
        quantity: 2,
        price: 6.99,
      }
    ],
    total: 42.00,
    createdAt: "2024-02-14T14:20:00Z",
    updatedAt: "2024-02-14T14:20:00Z"
  }
];