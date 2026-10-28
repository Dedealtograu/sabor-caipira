import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function AuthenticatedLayout() {
  const { signOut } = useAuth();

  const { loading, signed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !signed) {
      router.replace("/login");
    }
  }, [loading, signed]);

  if (loading || !signed) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarStyle: { backgroundColor: colors.tabsColor },
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={30} color="black" />,
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarIcon: () => (
            <FontAwesome name="delicious" size={30} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="fechar-pedidos"
        options={{
          title: "Fechar Pedidos",
          tabBarIcon: () => (
            <FontAwesome name="dollar" size={30} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
