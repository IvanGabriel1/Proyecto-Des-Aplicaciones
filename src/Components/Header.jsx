import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";
import { marginsHeader } from "../global/constants";
import ListaItem from "./Lista/ListaItem";
import { useState } from "react";
import Categories from "./Categories";

const Header = ({ title, setIsCategoria }) => {
  return (
    <View style={styles.header}>
      <Categories setIsCategoria={setIsCategoria} />
      <Text>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: marginsHeader.paddingTop,
    height: marginsHeader.headerHeight,
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
