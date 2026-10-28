import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/theme";

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text>Página de pedidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
