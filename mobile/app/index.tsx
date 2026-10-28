import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { loading, signed } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = segments[0] === '(tabs)';

    if (!signed && !isAuthRoute) {
      router.replace('/login');
    } else if (signed && !isAuthRoute) {
      router.replace('/(tabs)');
    } else if (!signed) {
      router.replace('/login');
    }

  }, [loading, signed, router])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brand} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
