import { colors } from "@/constants/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ backgroundColor: colors.background }}>
        <StatusBar style="light" />
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}
