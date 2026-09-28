import type { ProductType } from "./Product";

export type OrderItemType = {
  id: string;
  userId: number;
  productId: string;
  product: ProductType;
};

export type OrderItemsContextType = {
  orderItems: OrderItemType[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItemType[]>>;
};
