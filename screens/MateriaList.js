import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const MateriaScreen = (props) => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    firebase.db.collection("materias").onSnapshot((querySnapshot) => {
      const materias = [];
      querySnapshot.docs.forEach((doc) => {
        const { Descripcion, NumUnidades } = doc.data();
        materias.push({
          id: doc.id,
          Descripcion,
          NumUnidades,
        });
      });
      setMaterias(materias);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateMateriaScreen")}
        title="Agregar materia"
      />
      {materias.map((materia) => {
        return (
          <ListItem
            key={materia.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("MateriaDetailScreen", {
                materiaId: materia.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{materia.Descripcion}</ListItem.Title>
              <ListItem.Subtitle>{materia.NumUnidades}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default MateriaScreen;