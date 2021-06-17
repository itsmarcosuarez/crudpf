import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const StudentDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    apellido: "",
    semestre: "",
    turno: "",
    idSalon: "",
    idDocente: "",
    idEdificio: "",
  };

  const [student, setStudent] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setStudent({ ...student, [prop]: value });
  };

  const getStudentById = async (id) => {
    const dbRef = firebase.db.collection("students").doc(id);
    const doc = await dbRef.get();
    const student = doc.data();
    setStudent({ ...student, id: doc.id });
    setLoading(false);
  };

  const deleteStudent = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection("students").doc(props.route.params.studentId).delete();
    setLoading(false)
    props.navigation.navigate("StudentList");
  };
  
  const updateStudent = async () => {
    const studentRef = firebase.db.collection("students").doc(student.id);
    await studentRef.set({
        nombre: student.nombre,
        apellido: student.apellido,
        semestre: student.semestre,
        turno: student.turno,
        idSalon: student.idSalon,
        idDocente: student.idDocente,
        idEdificio: student.idEdificio,
    });
    setStudent(initialState);
    props.navigation.navigate("StudentList");
  };

  useEffect(() => {
    getStudentById(props.route.params.studentId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre"
          style={styles.inputGroup}
          value={student.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Apellido"
          style={styles.inputGroup}
          value={student.apellido}
          onChangeText={(value) => handleTextChange(value, "apellido")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Semestre"
          style={styles.inputGroup}
          value={student.semestre}
          onChangeText={(value) => handleTextChange(value, "semestre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Turno"
          style={styles.inputGroup}
          value={student.turno}
          onChangeText={(value) => handleTextChange(value, "turno")}
        />
      </View>
      <View>
        <TextInput
          placeholder="idSalon"
          style={styles.inputGroup}
          value={student.idSalon}
          onChangeText={(value) => handleTextChange(value, "idSalon")}
        />
      </View>
      <View>
        <TextInput
          placeholder="idDocente"
          style={styles.inputGroup}
          value={student.idDocente}
          onChangeText={(value) => handleTextChange(value, "idDocente")}
        />
      </View>
      <View>
        <TextInput
          placeholder="idEdificio"
          style={styles.inputGroup}
          value={student.idEdificio}
          onChangeText={(value) => handleTextChange(value, "idEdificio")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteStudent()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateStudent()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default StudentDetailScreen;