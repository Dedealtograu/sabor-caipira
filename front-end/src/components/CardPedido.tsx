import { useState } from "react";
import type { OrderType } from "../types/Order";
import type { OrderItemType } from "../types/OrderItem";

type ProductOrderType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
const CardPedido = ({
  id,
  status,
  total,
  deskNumber,
  createdAt,
  userId,
  orderItems,
}: OrderType) => {
  const [products, setProducts] = useState<ProductOrderType[]>([]);

  const quantities = orderItems.map((item: OrderItemType) => item.quantity);
  const getProducts = async () => {
    try {
      const response = await orderItems.map(async (item: OrderItemType) => {
        const productResponse = await fetch(
          `http://localhost:3000/product/${item.productId}`,
          {
            credentials: "include",
          },
        );
        const productData = await productResponse.json();
        return productData;
      });

      const productsData = await Promise.all(response);
      quantities.forEach((quantity, index) => {
        productsData[index].quantity = quantity;
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar produtos do pedido:", error);
    }
  };

  useState(() => {
    getProducts();
  });

  return (
    <div className="rounded-md bg-[#f6f1ea] p-2">
      <div>
        <table className="w-full">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Produto</th>
              <th className="p-2">Qtd</th>
              <th className="p-2">Preço</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {products.map((product: ProductOrderType) => (
              <tr key={product.id}>
                <td className="p-2">{product.name}</td>
                <td className="p-2 text-center">{product.quantity}</td>
                <td className="p-2">R${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="m-2 flex justify-between">
        <p className="font-bold">Mesa: {deskNumber}</p>
        <p className="font-bold">Total: R$ {total}</p>
      </div>
      <div className="m-2 h-0.5 bg-gray-900"></div>
      <div className="m-2 flex justify-end">
        <select className="font-bold">
          <option value="pendente" defaultChecked>
            {status}
          </option>
          <option value="entregue">Entregue</option>
        </select>
      </div>
    </div>
  );
};

export default CardPedido;
