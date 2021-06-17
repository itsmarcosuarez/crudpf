import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const SalonScreen = (props) => {
  const [salones, setSalones] = useState([]);

  useEffect(() => {
    firebase.db.collection("salones").onSnapshot((querySnapshot) => {
      const salones = [];
      querySnapshot.docs.forEach((doc) => {
        const { Descripcion, Capacidad } = doc.data();
        salones.push({
          id: doc.id,
          Descripcion,
          Capacidad,
        });
      });
      setSalones(salones);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateSalonScreen")}
        title="Agregar salon"
      />
      {salones.map((salon) => {
        return (
          <ListItem
            key={salon.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("SalonDetailScreen", {
                salonId: salon.id,
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
              <ListItem.Title>{salon.Descripcion}</ListItem.Title>
              <ListItem.Subtitle>{salon.Capacidad}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default SalonScreen;