import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/theme";

export default function Fecharpedidos() {
  return (
    <View style={styles.container}>
      <Text>Página de fechar pedidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
