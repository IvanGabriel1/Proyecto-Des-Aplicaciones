import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../Global/colors";
import { marginsHeader } from "../Global/constants";
import CategoriesMenu from "./CategoriesMenu";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { clearSession } from "../db";
import { clearUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = ({ title, setIsCategoria }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const user = useSelector((state) => state.userReducer.userEmail);
  const dispatch = useDispatch();

  const handleClearSession = async () => {
    try {
      await clearSession();
      dispatch(clearUser());
    } catch {
      console.log("Hubo un error al limpiar la sesión");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.left}>
          <CategoriesMenu setIsCategoria={setIsCategoria} />
        </View>

        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.right}>
          <Image
            source={require("../../assets/Logo-EFH.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {(canGoBack || user) && (
        <View style={styles.sessionRow}>
          <View style={styles.sessionSide}>
            {canGoBack && (
              <Pressable
                style={styles.goBack}
                onPress={() => navigation.goBack()}
              >
                <View style={styles.goBackContent}>
                  <Icon name="angle-left" size={24} />
                  <Text style={styles.goBackText}>Volver</Text>
                </View>
              </Pressable>
            )}
          </View>

          <View style={styles.sessionCenter} />

          <View style={styles.sessionSideRight}>
            {user && (
              <Pressable
                onPress={handleClearSession}
                style={({ pressed }) => [
                  styles.cerrarSesion,
                  pressed && styles.cerrarSesionPressed,
                ]}
              >
                <Text style={styles.cerrarSesionText}>Cerrar Sesión</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: marginsHeader.headerHeight,
    paddingHorizontal: 10,
  },
  left: {
    flex: 1,
    justifyContent: "flex-start",
  },
  center: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 12,
    color: "white",
    fontFamily: "Michroma-Regular",
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sessionSide: {
    flex: 1,
    alignItems: "flex-start",
  },
  sessionCenter: {
    flex: 1,
  },
  sessionSideRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  goBack: {
    padding: 5,
  },
  goBackContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  goBackText: {
    fontSize: 14,
    marginLeft: 6,
  },
  cerrarSesion: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 3,
  },
  cerrarSesionPressed: {
    opacity: 0.85,
  },
  cerrarSesionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
