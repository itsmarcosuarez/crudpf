import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateStudentScreen from "./screens/CreateStudentScreen";
import StudentDetailScreen from "./screens/StudentDetailScreen";
import StudentList from "./screens/StudentList";
import CreateTeacherScreen from "./screens/CreateTeacherScreen";
import TeacherDetailScreen from "./screens/TeacherDetailScreen";
import TeacherList from "./screens/TeacherList";
import CreateMateriaScreen from "./screens/CreateMateriaScreen";
import MateriaDetailScreen from "./screens/MateriaDetailScreen";
import MateriaList from "./screens/MateriaList";
import CreateEdificioScreen from "./screens/CreateEdificioScreen";
import EdificioDetailScreen from "./screens/EdificioDetailScreen";
import EdificioList from "./screens/EdificioList";
import CreateSalonScreen from "./screens/CreateSalonScreen";
import SalonDetailScreen from "./screens/SalonDetailScreen";
import SalonList from "./screens/SalonList";
import Index from './screens';
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Index"
        component={Index}
        options={{ title: "Menú" }}
      />
      <Stack.Screen
        name="StudentList"
        component={StudentList}
        options={{ title: "Lista de estudiantes" }}
      />
      <Stack.Screen
        name="CreateStudentScreen"
        component={CreateStudentScreen}
        options={{ title: "Agregar un nuevo estudiante" }}
      />
      <Stack.Screen
        name="StudentDetailScreen"
        component={StudentDetailScreen}
        options={{ title: "Detalles de estudiante" }}
      />
      <Stack.Screen
        name="TeacherList"
        component={TeacherList}
        options={{ title: "Lista de docentes" }}
      />
      <Stack.Screen
        name="CreateTeacherScreen"
        component={CreateTeacherScreen}
        options={{ title: "Agregar un nuevo docente" }}
      />
      <Stack.Screen
        name="TeacherDetailScreen"
        component={TeacherDetailScreen}
        options={{ title: "Detalles de docente" }}
      />
      <Stack.Screen
        name="MateriaList"
        component={MateriaList}
        options={{ title: "Lista de materias" }}
      />
      <Stack.Screen
        name="CreateMateriaScreen"
        component={CreateMateriaScreen}
        options={{ title: "Agregar una nueva materia" }}
      />
      <Stack.Screen
        name="MateriaDetailScreen"
        component={MateriaDetailScreen}
        options={{ title: "Detalles de materia" }}
      />
      <Stack.Screen
        name="EdificioList"
        component={EdificioList}
        options={{ title: "Lista de edificios" }}
      />
      <Stack.Screen
        name="CreateEdificioScreen"
        component={CreateEdificioScreen}
        options={{ title: "Agregar un nuevo edificio" }}
      />
      <Stack.Screen
        name="EdificioDetailScreen"
        component={EdificioDetailScreen}
        options={{ title: "Detalles de edificio" }}
      />
      <Stack.Screen
        name="SalonList"
        component={SalonList}
        options={{ title: "Lista de salones" }}
      />
      <Stack.Screen
        name="CreateSalonScreen"
        component={CreateSalonScreen}
        options={{ title: "Agregar un nuevo salon" }}
      />
      <Stack.Screen
        name="SalonDetailScreen"
        component={SalonDetailScreen}
        options={{ title: "Detalles de salon" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});