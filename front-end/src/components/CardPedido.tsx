const CardPedido = () => {
  return (
    <div className="rounded-md bg-[#f6f1ea] p-2">
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jantinha de arroz</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="m-2 h-0.5 bg-gray-900"></div>
      <div className="m-2 flex justify-end">
        <select className="font-bold">
          <option value="pendente" defaultChecked disabled>
            Pendente
          </option>
          <option value="entregue">Entregue</option>
        </select>
      </div>
    </div>
  );
};

export default CardPedido;
