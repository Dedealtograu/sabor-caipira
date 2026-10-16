import type { OrderItemType } from "./OrderItem";

export type OrderType = {
  id: string;
  status: "pendente" | "entregue" | "faturado";
  total: number;
  deskNumber: number;
  createdAt: string;
  userId: string;
  orderItems: OrderItemType[];
};
