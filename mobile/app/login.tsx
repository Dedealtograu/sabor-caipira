import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors, spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  async function handleLogin() {

    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);

      await signIn(email, password);

      router.replace('/(tabs)')

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao realizar login")
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <Input label="E-mail" placeholder="Digite seu e-mail" placeholderTextColor={colors.gray} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input label="Senha" placeholder="Digite sua senha" placeholderTextColor={colors.gray} secureTextEntry={true} value={password} onChangeText={setPassword} />
          <Button title="Entrar" loading={loading} onPress={handleLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  formContainer: {
    gap: spacing.md,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
})