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

const EdificioDetailScreen = (props) => {
  const initialState = {
    id: "",
    Descripcion: "",
    Ubicacion: "",
  };

  const [edificio, setEdificio] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setEdificio({ ...edificio, [prop]: value });
  };

  const getEdificioById = async (id) => {
    const dbRef = firebase.db.collection("edificios").doc(id);
    const doc = await dbRef.get();
    const edificio = doc.data();
    setEdificio({ ...edificio, id: doc.id });
    setLoading(false);
  };

  const deleteEdificio = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection("edificios").doc(props.route.params.edificioId).delete();
    setLoading(false)
    props.navigation.navigate("EdificioList");
  };
  
  const updateEdificio = async () => {
    const edificioRef = firebase.db.collection("edificios").doc(edificio.id);
    await edificioRef.set({
        Descripcion: edificio.Descripcion,
        Ubicacion: edificio.Ubicacion,
        });
    setEdificio(initialState);
    props.navigation.navigate("EdificioList");
  };

  useEffect(() => {
    getEdificioById(props.route.params.edificioId);
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
          value={edificio.Descripcion}
          onChangeText={(value) => handleTextChange(value, "Descripcion")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Ubicacion"
          style={styles.inputGroup}
          value={edificio.Ubicacion}
          onChangeText={(value) => handleTextChange(value, "Ubicacion")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteEdificio()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateEdificio()} color="#19AC52" />
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

export default EdificioDetailScreen;