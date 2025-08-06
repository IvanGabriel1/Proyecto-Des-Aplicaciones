import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";
import { colors } from "../../Global/colors";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/auth/authApi";
import { setUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { saveSession, clearSession } from "../../db";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persistSession, setPersistSession] = useState(false);
  const [triggerLogin, result] = useLoginMutation();
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const onsubmit = () => {
    triggerLogin({ email, password });
  };

  //console.log(result);

  useEffect(() => {
    const saveLoginSession = async () => {
      if (result.status === "fulfilled") {
        try {
          const { localId, email } = result.data;

          if (persistSession) {
            await saveSession(localId, email);
          } else {
            await clearSession();
          }
          dispatch(setUser({ localId, email }));
          setError(false);
        } catch (error) {
          // console.log("Error al guardar sesión:", error);
          setError(true);
        }
      } else if (result.status === "rejected") {
        setError(true);
      }
    };

    saveLoginSession();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipment for home</Text>
      <Text style={styles.subTitle}>Inicia sesión</Text>
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
      </View>

      {error ? (
        <Text style={styles.error}>Hubo un error al iniciar sesion</Text>
      ) : null}

      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Crea una
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </Pressable>
      <View style={styles.rememberMe}>
        <Text style={{ color: colors.white }}>¿Mantener sesión iniciada?</Text>
        <Switch
          onValueChange={() => setPersistSession(!persistSession)}
          value={persistSession}
          trackColor={{
            false: `${colors.white}`,
            true: `${colors.darkGray}`,
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
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
    marginBottom: 32,
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
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
