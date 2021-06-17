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

const SalonDetailScreen = (props) => {
  const initialState = {
    id: "",
    Descripcion: "",
    Ubicacion: "",
  };

  const [salon, setSalon] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setSalon({ ...salon, [prop]: value });
  };

  const getSalonById = async (id) => {
    const dbRef = firebase.db.collection("salones").doc(id);
    const doc = await dbRef.get();
    const salon = doc.data();
    setSalon({ ...salon, id: doc.id });
    setLoading(false);
  };

  const deleteSalon = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection("salones").doc(props.route.params.salonId).delete();
    setLoading(false)
    props.navigation.navigate("SalonList");
  };
  
  const updateSalon = async () => {
    const salonRef = firebase.db.collection("salones").doc(salon.id);
    await salonRef.set({
        Descripcion: salon.Descripcion,
        Capacidad: salon.Capacidad,
        });
    setSalon(initialState);
    props.navigation.navigate("SalonList");
  };

  useEffect(() => {
    getSalonById(props.route.params.salonId);
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
          value={salon.Descripcion}
          onChangeText={(value) => handleTextChange(value, "Descripcion")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Capacidad de personas"
          style={styles.inputGroup}
          value={salon.Capacidad}
          onChangeText={(value) => handleTextChange(value, "Capacidad")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteSalon()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateSalon()} color="#19AC52" />
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

export default SalonDetailScreen;