import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";

type ProductType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const CloseOrder = () => {
  const [deskNumber, setDeskNumber] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  const handleCreateOrder = async ({ deskNumber }: { deskNumber: number }) => {
    try {
      const response = await fetch("http://localhost:3000/orders/desknumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ deskNumber }),
      });

      if (!response.ok) {
        console.log("Error creating order");
        return;
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const priceTotal = products.reduce((total: number, product: ProductType) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleCloseOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders/close", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ deskNumber }),
      });

      if (!response.ok) {
        console.log("Error closing order");
        return;
      }

      const data = await response.json();
      setProducts(data);
      navigate("/");
    } catch (error) {
      console.error("Error closing order:", error);
    }
  };

  return (
    <div className="mx-auto flex h-210 w-full gap-2 bg-orange-600 px-3 md:w-300 md:justify-center md:px-2">
      <div className="mt-1.5 flex w-full flex-col gap-2 md:w-100">
        <p className="w-full text-center text-lg font-bold">Número da mesa</p>
        <input
          placeholder="Digite o número da mesa"
          type="number"
          className="w-full rounded-md bg-white px-2 py-2 text-xs text-[#32343E] placeholder-[#32343E] outline-none"
          onChange={(e) => setDeskNumber(Number(e.target.value))}
        />
        <Button
          title="Buscar pedidos"
          variant="default"
          onClick={() =>
            handleCreateOrder({ deskNumber: deskNumber as number })
          }
        />
        {products.length > 0 && (
          <div className="mt-4 flex w-full flex-col gap-2 rounded-md bg-[#f6f1ea] p-2">
            <table className="w-full">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2">Produto</th>
                  <th className="px-4 py-2">Qtd</th>
                  <th className="px-4 py-2">Subtotal</th>
                </tr>
              </thead>
              {products.length > 0 ? (
                <tbody>
                  {products.map((product: ProductType) => (
                    <tr key={product.id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
                      <td className="px-4 py-2">R$ {product.price}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td className="px-4 py-2" colSpan={3}>
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="mt-2 flex justify-end">
              {products.length > 0 && (
                <p className="text-lg font-bold">Total: R$ {priceTotal}</p>
              )}
            </div>
            <Button
              title="Fechar pedido"
              variant="outline"
              onClick={handleCloseOrder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CloseOrder;
