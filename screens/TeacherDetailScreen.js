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

const TeacherDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    apellido: "",
    birthdate: "",
    idMateria: "",
  };

  const [teacher, setStudent] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setTeacher({ ...teacher, [prop]: value });
  };

  const getTeacherById = async (id) => {
    const dbRef = firebase.db.collection("teachers").doc(id);
    const doc = await dbRef.get();
    const teacher = doc.data();
    setStudent({ ...teacher, id: doc.id });
    setLoading(false);
  };

  const deleteTeacher = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection("teachers").doc(props.route.params.teacherId).delete();
    setLoading(false)
    props.navigation.navigate("TeacherList");
  };
  
  const updateTeacher = async () => {
    const teacherRef = firebase.db.collection("teachers").doc(teacher.id);
    await teacherRef.set({
        nombre: teacher.nombre,
        apellido: teacher.apellido,
        birthdate: teacher.birthdate,
        idMateria: teacher.idMateria,
    });
    setStudent(initialState);
    props.navigation.navigate("TeacherList");
  };

  useEffect(() => {
    getTeacherById(props.route.params.teacherId);
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
          value={teacher.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Apellido"
          style={styles.inputGroup}
          value={teacher.apellido}
          onChangeText={(value) => handleTextChange(value, "apellido")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Fecha de nacimiento"
          style={styles.inputGroup}
          value={teacher.birthdate}
          onChangeText={(value) => handleTextChange(value, "birthdate")}
        />
      </View>
      <View>
        <TextInput
          placeholder="idMateria"
          style={styles.inputGroup}
          value={teacher.idMateria}
          onChangeText={(value) => handleTextChange(value, "idMateria")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteTeacher()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateTeacher()} color="#19AC52" />
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

export default TeacherDetailScreen;