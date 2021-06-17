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

const MateriaDetailScreen = (props) => {
  const initialState = {
    id: "",
    Descripcion: "",
    NumUnidades: "",
  };

  const [materia, setMateria] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setMateria({ ...materia, [prop]: value });
  };

  const getMateriaById = async (id) => {
    const dbRef = firebase.db.collection("materias").doc(id);
    const doc = await dbRef.get();
    const materia = doc.data();
    setMateria({ ...materia, id: doc.id });
    setLoading(false);
  };

  const deleteMateria = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection("materias").doc(props.route.params.materiaId).delete();
    setLoading(false)
    props.navigation.navigate("MateriaList");
  };
  
  const updateMateria = async () => {
    const materiaRef = firebase.db.collection("materias").doc(materia.id);
    await materiaRef.set({
        Descripcion: materia.Descripcion,
        NumUnidades: materia.NumUnidades,
        });
    setMateria(initialState);
    props.navigation.navigate("MateriaList");
  };

  useEffect(() => {
    getMateriaById(props.route.params.materiaId);
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
          placeholder="Descripción"
          style={styles.inputGroup}
          value={materia.Descripcion}
          onChangeText={(value) => handleTextChange(value, "Descripcion")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Numero de unidades"
          style={styles.inputGroup}
          value={materia.NumUnidades}
          onChangeText={(value) => handleTextChange(value, "NumUnidades")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteMateria()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateMateria()} color="#19AC52" />
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

export default MateriaDetailScreen;