import api from "@/services/api";
import { LoginResponse, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    async function loadData() {
      await loadStorageData();
    }

    loadData();
  }, []);

  async function loadStorageData() {
    try {
      setLoading(true);

      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken && storedUser) {
        //api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
        //setSigned(true);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post<LoginResponse>('/login', { email, password });

      const user = response.data;

      await AsyncStorage.setItem('token', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setUser(user);

    } catch (error: any) {
      if (error.response?.data?.error) {
        console.log(error.response.data.error);
      }

      console.log(error);
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['token', 'user']);
    setUser(null);
  }

  return (
    <AuthContext value={{ user, signed: !!user, loading, signIn, signOut }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Contexto de autenticação não encontrado');
  }

  return context;
}