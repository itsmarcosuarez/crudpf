import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const EdificioScreen = (props) => {
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    firebase.db.collection("edificios").onSnapshot((querySnapshot) => {
      const edificios = [];
      querySnapshot.docs.forEach((doc) => {
        const { Descripcion, Ubicacion } = doc.data();
        edificios.push({
          id: doc.id,
          Descripcion,
          Ubicacion,
        });
      });
      setEdificios(edificios);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateEdificioScreen")}
        title="Agregar edificio"
      />
      {edificios.map((edificio) => {
        return (
          <ListItem
            key={edificio.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("EdificioDetailScreen", {
                edificioId: edificio.id,
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
              <ListItem.Title>{edificio.Descripcion}</ListItem.Title>
              <ListItem.Subtitle>{edificio.Ubicacion}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default EdificioScreen;