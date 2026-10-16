import { X } from "lucide-react";
import Button from "./Button";
import OrderItem from "./OrderItem";
import { useContext, useEffect, useState } from "react";
import { DeskItmsContext } from "../contexts/DeskItmsContext";

type OrderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Order = ({ setIsOpen, isOpen }: OrderProps) => {
  const [deskNumber, setDeskNumber] = useState<number | null>(null);
  //const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const { deskItems, setDeskItems } = useContext(DeskItmsContext);

  const handleCreateOrder = async ({ deskNumber }: { deskNumber: number }) => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ deskNumber }),
      });

      if (deskItems.length === 0) {
        console.log("Não é possível finalizar um pedido vazio");
        return;
      }

      if (!response.ok) {
        console.log("Erro ao finalizar pedido");
        return;
      }

      setDeskItems([]);
      setIsOpen(false);
      console.log("Pedido finalizado com sucesso");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    const getDeskItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/desks", {
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Erro na requisição");
          return;
        }

        const data = await response.json();

        setDeskItems(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    getDeskItems();
  }, []);
  return (
    <div className="absolute right-0 z-10 flex h-screen w-90 flex-col bg-gray-700 px-3 py-5 text-white">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <p className="font-bold uppercase">Novo pedido</p>
      </div>
      <div className="m-5 flex items-center gap-2">
        <p className="w-100 text-lg font-bold">Nº da mesa</p>
        <input
          placeholder="Número da mesa"
          type="number"
          className="w-100 rounded-md bg-white px-2 py-2 text-xs text-[#32343E] placeholder-[#32343E] outline-none"
          onChange={(e) => setDeskNumber(Number(e.target.value))}
        />
      </div>
      <div className="mt-10 flex flex-1 flex-col gap-2">
        {deskItems.map((item) => (
          <OrderItem
            id={item.product.id}
            title={item.product.name}
            price={item.product.price}
            image={item.product.image}
            quantity={item.quantity}
            idItem={item.id}
            key={item.id}
          />
        ))}
      </div>
      <Button
        title="Finalizar pedido"
        onClick={() => {
          void handleCreateOrder({ deskNumber });
        }}
      />
    </div>
  );
};

export default Order;
