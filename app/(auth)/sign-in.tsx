import { useSignIn } from "@clerk/expo";
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

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <Text style={styles.logo}>⛽ FUELO</Text>
        <Text style={styles.subtitle}>Bentornato</Text>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>Apple</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>🦊</Text>
            <Text style={styles.socialText}>MetaMask</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>oppure</Text>
          <View style={styles.dividerLine} />
        </View>

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
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Accesso..." : "Accedi"}
            </Text>
          </Pressable>
        </View>

        {/* Link registrazione */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Non hai un account? </Text>
          <Link href="/sign-up">
            <Text style={styles.footerLink}>Registrati</Text>
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
    gap: 24,
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
    marginTop: -12,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  socialText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dividerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 1,
  },
  form: {
    gap: 12,
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
    marginTop: 4,
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
