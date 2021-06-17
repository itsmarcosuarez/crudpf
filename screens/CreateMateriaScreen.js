import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddMateriaScreen = (props) => {
  const initalState = {
    Descripcion: "",
    NumUnidades: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, Descripcion) => {
    setState({ ...state, [Descripcion]: value });
  };

  const saveNewMateria = async () => {
    if (state.Descripcion === "") {
      alert("por favor, proporcione una descripcion");
    } else {

      try {
        await firebase.db.collection("materias").add({
          Descripcion: state.Descripcion,
          NumUnidades: state.NumUnidades,
        });
        props.navigation.navigate("MateriaList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* Descripcion Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripción"
          onChangeText={(value) => handleChangeText(value, "Descripcion")}
          value={state.Descripcion}
        />
      </View>

      {/* NumUnidades Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Numero de unidades"
          onChangeText={(value) => handleChangeText(value, "NumUnidades")}
          value={state.NumUnidades}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar materia" onPress={() => saveNewMateria()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddMateriaScreen;
