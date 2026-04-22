import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Errore durante la registrazione");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Codice non valido");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text style={styles.logo}>⛽ FUELO</Text>
          <Text style={styles.subtitle}>Controlla la tua email</Text>
          <Text style={styles.hint}>
            Abbiamo inviato un codice di verifica a {email}
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Codice di verifica"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleVerify}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Verifica..." : "Verifica email"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <Text style={styles.logo}>⛽ FUELO</Text>
        <Text style={styles.subtitle}>Crea il tuo account</Text>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Registrazione..." : "Registrati"}
            </Text>
          </Pressable>
        </View>

        {/* Link login */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hai già un account? </Text>
          <Link href="/sign-in">
            <Text style={styles.footerLink}>Accedi</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 32,
  },
  logo: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: -20,
    letterSpacing: 1,
  },
  hint: {
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    marginTop: -20,
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  button: {
    backgroundColor: "#FF6B00",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  error: {
    color: "#FF4444",
    fontSize: 13,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
  },
  footerLink: {
    color: "#FF6B00",
    fontSize: 14,
    fontWeight: "700",
  },
});
