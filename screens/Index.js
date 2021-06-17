import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#0006CB', padding: 10, alignItems: 'center', borderRadius: 5 }}
        onPress={() => props.navigation.navigate('StudentList')}>
        <Text style={{color:'#fff', fontSize:20}}>Alumno</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#0006CB', padding: 10, alignItems: 'center', borderRadius: 5 }}
        onPress={() => props.navigation.navigate('TeacherList')}>
        <Text style={{color:'#fff', fontSize:20}}>Docente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#0006CB', padding: 10, alignItems: 'center', borderRadius: 5 }}
        onPress={() => props.navigation.navigate('MateriaList')}>
        <Text style={{color:'#fff', fontSize:20}}>Materia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#0006CB', padding: 10, alignItems: 'center', borderRadius: 5 }}
        onPress={() => props.navigation.navigate('SalonList')}>
        <Text style={{color:'#fff', fontSize:20}}>Salon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#0006CB', padding: 10, alignItems: 'center', borderRadius: 5 }}
        onPress={() => props.navigation.navigate('EdificioList')}>
        <Text style={{color:'#fff', fontSize:20}}>Edificio</Text>
      </TouchableOpacity>
    </View>
  );
}

function Alumno() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Alumnos</Text>
    </View>
  );
}

function Docente() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Docentes</Text>
    </View>
  );
}

function Materia() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Materias</Text>
    </View>
  );
}

function Edificio() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Edificios</Text>
    </View>
  );
}

function Salon() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Salones</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function Index() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Seleccione una opción:" component={HomeScreen} />
        <Stack.Screen name="Alumno" component={Alumno} />
        <Stack.Screen name="Docente" component={Docente} />
        <Stack.Screen name="Materia" component={Materia} />
        <Stack.Screen name="Salon" component={Salon} />
        <Stack.Screen name="Edificio" component={Edificio} />
      </Stack.Navigator>   
  );
}

export default Index;