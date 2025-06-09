import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Global/colors";
import { marginsHeader } from "../Global/constants";
import ListaItem from "./Lista/ListaItem";
import { useState } from "react";
import Categories from "./Categories";

const Header = () => {
  return (
    <View style={styles.header}>
      <Categories />
      <Text>Nombre de la tienda</Text>
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
