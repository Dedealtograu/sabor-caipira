import { ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";

const Product = ({ name, description, price, image }: ProductType) => {
  return (
    <div>
      <div className="flex items-center gap-2 text-white">
        <img src={`./${image}.svg`} alt="dinner" className="h-18 w-18" />
        <div className="flex w-full flex-col md:w-100">
          <p className="md:text-md font-bold uppercase">{name}</p>
          <p className="flex-1 text-xs md:text-sm">{description}</p>
          <div className="flex items-center justify-end gap-2">
            <p className="font-bold">{formatterPrice(Number(price))}</p>
            <ShoppingCart size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
