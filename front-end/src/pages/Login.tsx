import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 404) {
        setError("Usuário não encontrado");
      }

      if (response.status === 401) {
        setError("E-mail ou senha incorretos");
      }

      if (response.status === 400) {
        setError("Todas as informações são obrigatórias");
      }

      if (response.status === 500) {
        setError("Tente novamente mais tarde");
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-orange-500"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4" />
        </Link>
        <div className="mb-2 flex flex-col gap-2">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-left text-sm font-bold text-red-600">{error}</p>
        </div>

        <Button title="Login" type="submit" />
      </div>
    </form>
  );
};

export default Login;
