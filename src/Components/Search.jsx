import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Search = ({ searchText, setSearchText }) => {
  const [error, setError] = useState("");

  const validarTexto = (input) => {
    setSearchText(input);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={"Buscar..."}
          value={searchText}
          onChangeText={validarTexto}
        />
        <Ionicons name="search" size={32} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  containerSearch: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Search;
