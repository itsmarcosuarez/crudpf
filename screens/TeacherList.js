import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const TeacherScreen = (props) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    firebase.db.collection("teachers").onSnapshot((querySnapshot) => {
      const teachers = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, apellido, birthdate, idMateria } = doc.data();
        teachers.push({
          id: doc.id,
          nombre,
          apellido,
          birthdate,
          idMateria,
        });
      });
      setTeachers(teachers);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateTeacherScreen")}
        title="Agregar docente"
      />
      {teachers.map((teachers) => {
        return (
          <ListItem
            key={teachers.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("TeacherDetailScreen", {
                teacherId: teachers.id,
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
              <ListItem.Title>{teachers.nombre}</ListItem.Title>
              <ListItem.Subtitle>{teachers.apellido}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default TeacherScreen;