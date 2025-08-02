import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { colors } from "../../global/colors";
import { useEffect, useState } from "react";
import { useSignupMutation } from "../../services/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [triggerSignUp, result] = useSignupMutation();
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (result.status === "fulfilled") {
      const { localId, email } = result.data;

      dispatch(setUser({ localId, email }));
      setError(false);
    }

    if (result.status === "rejected") {
      setError(true);
    }
  }, [result.status]);

  const onSubmit = () => {
    if (password === confirmPassword) {
      triggerSignUp({ email, password });
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipment for home</Text>
      <Text style={styles.subTitle}>Registrate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Repetir password"
          style={styles.textInput}
          secureTextEntry
        />
      </View>

      {error ? (
        <Text style={styles.error}>No se pudo registrar el usuario</Text>
      ) : null}

      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Iniciar sesión
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Crear cuenta</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    color: colors.third,
    fontFamily: "Michroma-Regular",
    fontSize: 28,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 1,
  },
  subTitle: {
    fontFamily: "Caveat-Medium",
    fontSize: 22,
    color: colors.white,
    marginBottom: 24,
    letterSpacing: 2,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 8,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "85%",
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.darkGray,
    color: colors.white,
    borderRadius: 12,
    fontSize: 16,
  },
  footTextContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 6,
  },
  whiteText: {
    color: colors.white,
    fontSize: 14,
  },
  underLineText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: colors.black,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  error: {
    color: colors.red,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 12,
    marginTop: 4,
  },
});
