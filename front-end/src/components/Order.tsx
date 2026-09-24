import { X } from "lucide-react";
import Button from "./Button";
import OrderItem from "./OrderItem";

type OrderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Order = ({ setIsOpen, isOpen }: OrderProps) => {
  return (
    <div className="absolute right-0 flex h-screen w-90 flex-col bg-gray-700 px-3 py-5 text-white">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <p className="font-bold uppercase">Novo pedido</p>
      </div>
      <div className="mt-10 flex flex-1 flex-col gap-2">
        <OrderItem />
        <OrderItem />
      </div>
      <Button title="Finalizar pedido" />
    </div>
  );
};

export default Order;
