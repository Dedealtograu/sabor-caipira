import { ChevronLeft, ChevronRight, Trash } from "lucide-react";

const OrderItem = () => {
  return (
    <div className="flex items-center gap-3">
      <img src="/dinner.svg" alt="dinner" className="w-16" />
      <div className="flex-1">
        <p className="font-bold uppercase">Jantinha de arroz</p>
        <p className="text-xs">R$ 10,00</p>
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
      <Trash className="cursor-pointer" />
    </div>
  );
};

export default OrderItem;
