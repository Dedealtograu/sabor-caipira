import { createContext, useState, type ReactNode } from "react";
import type { OrderItemType, OrderItemsContextType } from "../types/OrderItem";

// eslint-disable-next-line
export const OrderItmsContext = createContext<OrderItemsContextType>({
  orderItems: [],
  setOrderItems: () => {},
});

export const OrderItmsProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  return (
    <OrderItmsContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </OrderItmsContext.Provider>
  );
};
