import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddStudentScreen = (props) => {
  const initalState = {
    nombre: "",
    apellido: "",
    semestre: "",
    turno: "",
    idSalon: "",
    idDocente: "",
    idEdificio: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewStudent = async () => {
    if (state.nombre === "") {
      alert("por favor, proporcione un nombre");
    } else {

      try {
        await firebase.db.collection("students").add({
          nombre: state.nombre,
          apellido: state.apellido,
          semestre: state.semestre,
          turno: state.turno,
          idSalon: state.idSalon,
          idDocente: state.idDocente,
          idEdificio: state.idEdificio,
        });
        props.navigation.navigate("StudentList");
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
          placeholder="Semestre"
          onChangeText={(value) => handleChangeText(value, "semestre")}
          value={state.semestre}
        />
      </View>

       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="Turno"
          onChangeText={(value) => handleChangeText(value, "turno")}
          value={state.turno}
        />
      </View>

       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="idSalon"
          onChangeText={(value) => handleChangeText(value, "idSalon")}
          value={state.idSalon}
        />
      </View>
        {/* Input */}
        <View style={styles.inputGroup}>
        <TextInput
          placeholder="idDocente"
          onChangeText={(value) => handleChangeText(value, "idDocente")}
          value={state.idDocente}
        />
      </View>
       {/* Input */}
       <View style={styles.inputGroup}>
        <TextInput
          placeholder="idEdificio"
          onChangeText={(value) => handleChangeText(value, "idEdificio")}
          value={state.idEdificio}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar alumno" onPress={() => saveNewStudent()} />
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

export default AddStudentScreen;
