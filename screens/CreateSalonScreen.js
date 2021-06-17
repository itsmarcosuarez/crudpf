import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddSalonScreen = (props) => {
  const initalState = {
    Descripcion: "",
    Capacidad: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, Descripcion) => {
    setState({ ...state, [Descripcion]: value });
  };

  const saveNewSalon = async () => {
    if (state.Descripcion === "") {
      alert("por favor, proporcione una descripcion");
    } else {

      try {
        await firebase.db.collection("salones").add({
          Descripcion: state.Descripcion,
          Capacidad: state.Capacidad,
        });
        props.navigation.navigate("SalonList");
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
          placeholder="Capacidad"
          onChangeText={(value) => handleChangeText(value, "Capacidad")}
          value={state.Capacidad}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar salon" onPress={() => saveNewSalon()} />
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

export default AddSalonScreen;