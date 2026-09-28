import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";

type OrderItemType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const OrderItem = ({ id, title, price, image }: OrderItemType) => {
  return (
    <div className="flex items-center gap-3">
      <img src={`./${image}.svg`} alt="dinner" className="w-16" />
      <div className="flex-1">
        <p className="font-bold uppercase">{title}</p>
        <p className="text-xs">R$ {formatterPrice(Number(price))}</p>
        <div className="mt-1 flex items-center gap-3">
          <ChevronLeft
            size={30}
            className="cursor-pointer rounded-md bg-red-500 p-1"
          />
          <p className="font-bold">1</p>
          <ChevronRight
            size={30}
            className="cursor-pointer rounded-md bg-red-500 p-1"
          />
        </div>
      </div>
      <Trash className="cursor-pointer" onClick={() => alert(id)} />
    </div>
  );
};

export default OrderItem;
