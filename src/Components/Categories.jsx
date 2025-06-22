import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
} from "react-native";
import categories from "../../Data/categories.json";
import { useState, useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

const Categories = ({}) => {
  const [isOpenCategorias, setIsOpenCategorias] = useState(false);
  const { setSelectedCategory } = useContext(CategoryContext);

  const handleOpenCategorias = () => {
    setIsOpenCategorias(!isOpenCategorias);
  };

  const handleChosenCategory = (cat) => {
    setSelectedCategory(cat);
    setIsOpenCategorias(false);
  };

  return (
    <View style={styles.categoriesContainer}>
      <TouchableOpacity onPress={handleOpenCategorias}>
        {isOpenCategorias ? (
          <Text style={styles.cerrarModal}>x</Text>
        ) : (
          <Text style={styles.abrirModal}>≡</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={isOpenCategorias}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.contenedorModal}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={handleOpenCategorias}>
              <Text style={{ fontSize: 16 }}>❌ Cerrar</Text>
            </TouchableOpacity>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => handleChosenCategory(item)}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Categories;

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
