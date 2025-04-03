import React from 'react'
import { Text, View } from 'react-native'
import 'react-native-gesture-handler';
import HomeScreen from './src/screen/CharacterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import InitialScreen from './src/screen/InitialScreen';
import PlanetScreen from './src/screen/PlanetScreen';
import DetailsScreen from './src/screen/DetailsScreen';
import DetailsPlanetScreen from './src/screen/DetailsPlanetScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Home' >
    //     <Stack.Screen name='Home' component={HomeScreen} options={{title: 'Home'}} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={()=>(      
        <Drawer.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#f79400', // Color de fondo del encabezado
          },
          headerTintColor: '#fff', // Color del texto del encabezado
        }}>
          <Drawer.Screen name="Inicio" component={InitialScreen} />
          <Drawer.Screen name="Personajes" component={HomeScreen} />
          <Drawer.Screen name="Planetas" component={PlanetScreen} />

        </Drawer.Navigator>)
      } 
      options={	{headerShown:false}}
      />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="DetailsPlanetScreen" component={DetailsPlanetScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

