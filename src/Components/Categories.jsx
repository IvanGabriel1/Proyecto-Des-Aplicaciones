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
import { useState } from "react";
import { marginsHeader } from "../Global/constants";

const Categories = () => {
  const [isOpenCategorias, setIsOpenCategorias] = useState(false);

  const handleOpenCategorias = () => {
    setIsOpenCategorias(!isOpenCategorias);
  };

  return (
    <View style={styles.categoriesContainer}>
      <TouchableOpacity onPress={handleOpenCategorias}>
        {isOpenCategorias ? (
          <Text>❌ Cerrar</Text>
        ) : (
          <Text>🟢 Ver Categorias</Text>
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
                <TouchableOpacity style={styles.categoryButton}>
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
});
