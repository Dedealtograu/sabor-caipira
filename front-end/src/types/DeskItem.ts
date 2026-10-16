import type { ProductType } from "./Product";

export type DeskItemType = {
  id: string;
  userId: number;
  productId: string;
  product: ProductType;
  quantity: number;
};

export type DeskItemsContextType = {
  deskItems: DeskItemType[];
  setDeskItems: React.Dispatch<React.SetStateAction<DeskItemType[]>>;
};
