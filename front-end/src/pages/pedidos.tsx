import { useEffect, useState } from "react";
import CardPedido from "../components/CardPedido";
import type { OrderType } from "../types/Order";

const Pedidos = () => {
  const [category, setCategory] = useState("pendente");
  const [order, setOrder] = useState<OrderType[]>([]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const selectedElement =
      "flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#f6f1ea] bg-[#f6f1ea] text-xs font-bold md:h-9 md:w-32 md:text-lg";

    const unselectedElement =
      "flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#f6f1ea] bg-orange-600 text-xs font-bold text-[#f6f1ea] hover:bg-[#f6f1ea] hover:text-black md:h-9 md:w-32 md:text-lg";

    if (categoryName === category) {
      return selectedElement;
    }
    return unselectedElement;
  };

  const filteredOrders = order.filter((order) => order.status === category);

  useEffect(() => {
    const gtetOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders", {
          credentials: "include",
        });
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    gtetOrders();
  }, []);

  return (
    <div className="mx-auto h-210 w-full justify-center gap-2 bg-orange-600 px-3 md:w-300 md:px-2">
      {/* Categorias */}
      <div className="flex justify-center gap-2 py-4">
        <div
          className={getCategoryClass("pendente")}
          onClick={() => handleCategoryChange("pendente")}
        >
          Pendentes
        </div>
        <div
          className={getCategoryClass("entregue")}
          onClick={() => handleCategoryChange("entregue")}
        >
          Entregues
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {filteredOrders.map((order) => (
          <CardPedido
            key={order.id}
            id={order.id}
            status={order.status}
            total={order.total}
            deskNumber={order.deskNumber}
            orderItems={order.orderItems}
          />
        ))}
        {filteredOrders.length === 0 && <p>Não há pedidos desta categoria</p>}
      </div>
    </div>
  );
};

export default Pedidos;
