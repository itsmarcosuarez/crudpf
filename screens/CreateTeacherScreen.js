import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddTeacherScreen = (props) => {
  const initalState = {
    nombre: "",
    apellido: "",
    birthdate: "",
    idMateria: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewTeacher = async () => {
    if (state.nombre === "") {
      alert("por favor, proporcione un nombre");
    } else {

      try {
        await firebase.db.collection("teachers").add({
          nombre: state.nombre,
          apellido: state.apellido,
          birthdate: state.birthdate,
          idMateria: state.idMateria,
        });
        props.navigation.navigate("TeacherList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* Nombre Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.nombre}
        />
      </View>

      {/* Apellido Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Apellido"
          onChangeText={(value) => handleChangeText(value, "apellido")}
          value={state.apellido}
        />
      </View>

       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="Fecha de nacimiento"
          onChangeText={(value) => handleChangeText(value, "birthdate")}
          value={state.birthdate}
        />
      </View>

       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="idMateria"
          onChangeText={(value) => handleChangeText(value, "idMateria")}
          value={state.idMateria}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar docente" onPress={() => saveNewTeacher()} />
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

export default AddTeacherScreen;
