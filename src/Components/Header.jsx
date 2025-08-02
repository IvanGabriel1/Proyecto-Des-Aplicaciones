import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../global/colors";
import { marginsHeader } from "../global/constants";
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
    <View>
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
      {canGoBack && (
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <View style={styles.goBackContent}>
            <Icon name="angle-left" size={32} />
            <Text>Volver</Text>
          </View>
        </Pressable>
      )}
      {user && (
        <Pressable onPress={handleClearSession}>
          <Text>Salir</Text>
        </Pressable>
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
  goBackContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: "16",
    paddingTop: 8,
  },
  goBack: {
    left: 24,
    width: 50,
    height: 50,
  },
});
