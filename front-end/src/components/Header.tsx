import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { LogOut, HandPlatter, Box, LayoutGrid, Plus } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-orange-300">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-187 md:p-0">
        <img src="/logomenu.png" alt="Logo" />
        {user ? (
          <div className="text-md flex items-center gap-8 font-bold text-gray-700">
            <div className="flex items-center gap-2 text-blue-800">
              <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                <Box />
              </div>
              <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                <LayoutGrid />
              </div>
              <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                <Plus />
              </div>
            </div>
            <div className="relative cursor-pointer">
              <HandPlatter size={20} />
              <p className="absolute -top-3 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-800 text-xs text-white">
                1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>Olá, {user.name}</p>{" "}
              <LogOut size={20} className="cursor-pointer" />
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
