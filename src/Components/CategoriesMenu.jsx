import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
//import categories from "../data/categories.json";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setCategorySelected,
  filterProducts,
} from "../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../services/shop/shopApi";

const CategoriesMenu = () => {
  const [isOpenCategorias, setIsOpenCategorias] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const handleOpenCategorias = () => {
    setIsOpenCategorias(!isOpenCategorias);
  };

  const handleChosenCategory = (catTitle) => {
    dispatch(setCategorySelected(catTitle));
    dispatch(filterProducts());
    navigation.navigate("ItemListCategories");
    setIsOpenCategorias(false);
  };

  const handleChosenHome = () => {
    dispatch(setCategorySelected(""));
    navigation.navigate("Home");
    setIsOpenCategorias(false);
  };

  return (
    <View style={styles.categoriesContainer}>
      <Pressable onPress={handleOpenCategorias}>
        {isOpenCategorias ? (
          <Text style={styles.cerrarModal}>x</Text>
        ) : (
          <Text style={styles.abrirModal}>≡</Text>
        )}
      </Pressable>

      <Modal
        visible={isOpenCategorias}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.contenedorModal}>
          <View style={styles.modal}>
            <Pressable onPress={handleOpenCategorias}>
              <Text style={{ fontSize: 16 }}>❌ Cerrar</Text>
            </Pressable>
            <Pressable onPress={handleChosenHome}>
              <Text style={styles.categoryButtonHome}>Home</Text>
            </Pressable>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.categoryButton}
                  onPress={() => handleChosenCategory(item.title)}
                >
                  <Text style={styles.categoryText}>{item.title}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoriesMenu;

const styles = StyleSheet.create({
  contenedorModal: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  categoryButton: {
    backgroundColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  categoryButtonHome: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    textAlign: "center",
  },
  categoryText: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  abrirModal: {
    fontSize: 46,
    alignSelf: "center",
  },
  cerrarModal: {
    fontSize: 36,
    alignSelf: "center",
  },
});
