import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("jantinhas");
  const [products, setProducts] = useState<ProductType[]>([]);

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

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };
    getProducts();
  }, []);

  return (
    <div className="mx-auto h-200 w-full justify-center gap-2 bg-orange-600 px-3 md:w-300 md:px-2">
      <div className="flex justify-center gap-2 py-4">
        <div
          className={getCategoryClass("jantinhas")}
          onClick={() => handleCategoryChange("jantinhas")}
        >
          Jantinhas
        </div>
        <div
          className={getCategoryClass("espetinhos")}
          onClick={() => handleCategoryChange("espetinhos")}
        >
          Espetinhos
        </div>
        <div
          className={getCategoryClass("bibidas")}
          onClick={() => handleCategoryChange("bibidas")}
        >
          Bibidas
        </div>
        <div
          className={getCategoryClass("sucos")}
          onClick={() => handleCategoryChange("sucos")}
        >
          Sucos
        </div>
        <div
          className={getCategoryClass("porcoes")}
          onClick={() => handleCategoryChange("porcoes")}
        >
          Porções
        </div>
        <div
          className={getCategoryClass("caldos")}
          onClick={() => handleCategoryChange("caldos")}
        >
          Caldos
        </div>
      </div>
      <p className="m-2 font-bold text-white uppercase">{category}</p>
      <div className="flex flex-col gap-2">
        {filteredProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        {filteredProducts.length === 0 && (
          <p>Não há produtos desta categoria</p>
        )}
      </div>
    </div>
  );
};

export default Home;
