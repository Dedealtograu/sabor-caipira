import { useState } from "react";
import CardPedido from "../components/CardPedido";

const Pedidos = () => {
  const [category, setCategory] = useState("pendente");
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

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-2 bg-orange-600 px-3 md:px-0">
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
        <CardPedido />
      </div>
    </div>
  );
};

export default Pedidos;
