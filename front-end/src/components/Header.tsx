import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-orange-300">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-187 md:p-0">
        <img src="/logomenu.png" alt="Logo" />
        <Link to="/login">
          {user ? (
            <p className="text-md font-bold text-gray-700">Olá, {user.name}</p>
          ) : (
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-green-700 text-sm font-bold text-white">
              Entrar
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
