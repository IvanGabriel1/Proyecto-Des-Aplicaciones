import { StyleSheet, View, Text } from "react-native";
import Header from "../Components/Header";

import Categories from "../Components/Categories";
import ListaItem from "../Components/Lista/ListaItem";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header></Header>
      <ListaItem />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
