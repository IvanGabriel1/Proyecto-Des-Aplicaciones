import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../global/colors";
import { marginsHeader } from "../global/constants";
import Categories from "./Categories";

const Header = ({ title, setIsCategoria }) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Categories setIsCategoria={setIsCategoria} />
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
});
