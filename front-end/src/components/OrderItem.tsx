import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";
import { useContext } from "react";
import { DeskItmsContext } from "../contexts/DeskItmsContext";

type OrderItemType = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  idItem: string;
};

const OrderItem = ({
  id,
  title,
  price,
  image,
  quantity,
  idItem,
}: OrderItemType) => {
  const { setDeskItems } = useContext(DeskItmsContext);

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

  const deleteDeskItem = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/deldesk/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro na requisição");
        return;
      }

      getDeskItems();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const incrementQuantity = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/desk/increment/${id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro na requisição");
        return;
      }

      getDeskItems();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const decrementQuantity = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/desk/decrement/${id}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro na requisição");
        return;
      }

      getDeskItems();
    } catch (error) {
      console.log(error);
      return;
    }
  };

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
            onClick={() => decrementQuantity(idItem)}
          />
          <p className="font-bold">{quantity}</p>
          <ChevronRight
            size={30}
            className="cursor-pointer rounded-md bg-red-500 p-1"
            onClick={() => incrementQuantity(idItem)}
          />
        </div>
      </div>
      <Trash
        className="cursor-pointer"
        onClick={() => deleteDeskItem(idItem)}
      />
    </div>
  );
};

export default OrderItem;
