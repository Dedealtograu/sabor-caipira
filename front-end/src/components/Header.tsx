import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { LogOut, ShoppingCart, Box, LayoutGrid, Plus } from "lucide-react";
import Order from "./order";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (response.status !== 200) {
        console.error("deu ruim");
        return;
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handdleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("deu ruim");
        return;
      }

      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border";

    if (location.pathname === path) {
      return `${baseClass} bg-gray-400`;
    }

    return baseClass;
  };

  return (
    <div className="mx-auto w-full bg-[#ff9a4d] md:w-300">
      {isOpen && <Order setIsOpen={setIsOpen} isOpen={isOpen} />}
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-187 md:p-0">
        <Link to="/">
          <img src="/logomenu.png" alt="Logo" />
        </Link>
        {user ? (
          <div className="text-md flex items-center gap-8 font-bold text-gray-700">
            {user.admin && (
              <div className="hidden items-center gap-2 text-blue-800 md:flex">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutGrid />
                  </div>
                </Link>
                <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                  <Plus />
                </div>
              </div>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart size={20} onClick={() => setIsOpen(!isOpen)} />
              <p className="absolute -top-3 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-800 text-xs text-white">
                1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>Olá, {user.name}</p>{" "}
              <LogOut
                size={20}
                className="cursor-pointer"
                onClick={() => handdleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-green-700 text-sm font-bold text-white">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
