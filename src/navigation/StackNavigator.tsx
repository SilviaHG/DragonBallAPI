import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import InitialScreen from "../screen/InitialScreen";
import PlanetScreen from "../screen/PlanetScreen";
import CharacterScreen from "../screen/CharacterScreen";
import DetailsCharacterScreen from "../screen/DetailsCharacterScreen";
import DetailsPlanetScreen from "../screen/DetailsPlanetScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screen/LoginScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen name="Login" component={LoginScreen}
                options={{
                    title: 'Inicio de Sesión',
                    headerStyle: { backgroundColor: '#f79400' }, headerTintColor: '#fff'
                }} />

            <Stack.Screen
                name="InitialScreen"
                component={() => (
                    <Drawer.Navigator initialRouteName="Inicio" screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f79400', // Color de fondo del encabezado
                        },
                        headerTintColor: '#fff', // Color del texto del encabezado
                    }}>
                        <Drawer.Screen name="Inicio" component={InitialScreen} />
                        <Drawer.Screen name="Personajes" component={CharacterScreen} />
                        <Drawer.Screen name="Planetas" component={PlanetScreen} />
                        <Drawer.Screen
                            name="Cerrar Sesión"
                            component={LoginScreen}
                            listeners={({ navigation }) => ({
                                focus: () => {
                                    // Navegar a la pantalla de Login
                                    navigation.navigate('Login');
                                },
                            })}
                        />

                    </Drawer.Navigator>)
                }
                options={{ headerShown: false }}
            />

            <Stack.Screen name="DetailsCharacterScreen" component={DetailsCharacterScreen}
                options={{
                    title: 'Detalles de Personaje',
                    headerStyle: { backgroundColor: '#f79400' }, headerTintColor: '#fff'
                }} />

            <Stack.Screen name="DetailsPlanetScreen" component={DetailsPlanetScreen}
                options={{
                    title: 'Detalles de Planeta',
                    headerStyle: { backgroundColor: '#f79400' }, headerTintColor: '#fff'
                }} />
        </Stack.Navigator>
    )
}

export default StackNavigator



