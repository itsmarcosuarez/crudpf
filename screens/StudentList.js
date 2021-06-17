import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const StudentScreen = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    firebase.db.collection("students").onSnapshot((querySnapshot) => {
      const students = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, apellido, semestre, turno, idSalon, idDocente,idEdificio } = doc.data();
        students.push({
          id: doc.id,
          nombre,
          apellido,
          semestre,
          turno,
          idSalon,
          idDocente,
          idEdificio,
        });
      });
      setStudents(students);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateStudentScreen")}
        title="Agregar alumno"
      />
      {students.map((student) => {
        return (
          <ListItem
            key={student.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("StudentDetailScreen", {
                studentId: student.id,
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
              <ListItem.Title>{student.nombre}</ListItem.Title>
              <ListItem.Subtitle>{student.apellido}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default StudentScreen;