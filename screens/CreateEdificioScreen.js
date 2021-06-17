import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddEdificioScreen = (props) => {
  const initalState = {
    Descripcion: "",
    Ubicacion: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, Descripcion) => {
    setState({ ...state, [Descripcion]: value });
  };

  const saveNewEdificio = async () => {
    if (state.Descripcion === "") {
      alert("por favor, proporcione una descripcion");
    } else {

      try {
        await firebase.db.collection("edificios").add({
          Descripcion: state.Descripcion,
          Ubicacion: state.Ubicacion,
        });
        props.navigation.navigate("EdificioList");
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
          placeholder="Ubicacion"
          onChangeText={(value) => handleChangeText(value, "Ubicacion")}
          value={state.Ubicacion}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar edificio" onPress={() => saveNewEdificio()} />
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

export default AddEdificioScreen;