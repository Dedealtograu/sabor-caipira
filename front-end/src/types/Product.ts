export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  setProducts?: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
