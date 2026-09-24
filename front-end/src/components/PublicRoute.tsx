import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [isChecking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie;

    if (cookie) {
      const cookies = cookie.split("; ");
      const userCookie = cookies.find((c) => c.startsWith("user="));

      if (userCookie) {
        navigate("/", { replace: true });
        return;
      }
    }
    // eslint-disable-next-line
    setChecking(false);
  }, [navigate]);

  if (isChecking) {
    return <div>Carregando...</div>;
  }

  return <div>{children}</div>;
};

export default PublicRoute;
