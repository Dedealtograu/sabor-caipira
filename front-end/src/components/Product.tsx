import { ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { useContext } from "react";
import { OrderItmsContext } from "../contexts/OrderItmsContext";

const Product = ({ id, name, description, price, image }: ProductType) => {
  const { orderItems, setOrderItems } = useContext(OrderItmsContext);

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

  const newOrderItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        console.log("Erro na requisição");
        return;
      }

      getOrderItems();

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-white">
        <img src={`./${image}.svg`} alt="dinner" className="h-18 w-18" />
        <div className="flex w-full flex-col md:w-100">
          <p className="md:text-md font-bold uppercase">{name}</p>
          <p className="flex-1 text-xs md:text-sm">{description}</p>
          <div className="flex items-center justify-end gap-2">
            <p className="font-bold">{formatterPrice(Number(price))}</p>
            <ShoppingCart
              size={18}
              className="cursor-pointer"
              onClick={() => newOrderItem()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
