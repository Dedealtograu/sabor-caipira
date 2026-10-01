import { X } from "lucide-react";
import Button from "./Button";
import OrderItem from "./OrderItem";
import { useContext, useEffect } from "react";
import { OrderItmsContext } from "../contexts/OrderItmsContext";

type OrderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Order = ({ setIsOpen, isOpen }: OrderProps) => {
  //const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const { orderItems, setOrderItems } = useContext(OrderItmsContext);

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders", {
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Erro na requisição");
          return;
        }

        const data = await response.json();

        setOrderItems(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    getOrderItems();
  }, []);
  return (
    <div className="absolute right-0 z-10 flex h-screen w-90 flex-col bg-gray-700 px-3 py-5 text-white">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <p className="font-bold uppercase">Novo pedido</p>
      </div>
      <div className="mt-10 flex flex-1 flex-col gap-2">
        {orderItems.map((item) => (
          <OrderItem
            id={item.product.id}
            title={item.product.name}
            price={item.product.price}
            image={item.product.image}
            quantity={item.quantity}
            key={item.id}
          />
        ))}
      </div>
      <Button title="Finalizar pedido" />
    </div>
  );
};

export default Order;
