import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const LoginScreen = ({navigation}:any) => {
    //estado para el usuario y contraseña
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //funcion para validar y redirijir

    const manejarLogin=() =>{
        //validar campos vacios
        if(!username  || !password ){
            Alert.alert('Error','Por favor complete todos los campos')
            return
        }

        if(username === 'admin' && password === '1234'){
            navigation.navigate('InitialScreen', { screen: 'Inicio', params:{ user:username}, });
        }else{
            Alert.alert('Error','Usuario o contraseña incorrectos')
        }
    }

  return (
    <View style={styles.container}>

         <Image source={{ uri: 'https://1000marcas.net/wp-content/uploads/2022/02/Dragon-Ball-Logo-1996.png' }}
          style={styles.logo} />
        
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />
         <TouchableOpacity style={styles.button} onPress={manejarLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 30,
        flex: 1,
        backgroundColor: '#f5f5f5', // Fondo claro y neutro
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#000000', // Color gris oscuro para el título
        letterSpacing: 1.5,
    },
    input: {
        padding: 14,
        marginBottom: 20,
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#ffffff', // Fondo blanco para los inputs
        borderColor: '#d1d1d1', // Bordes grises suaves
        borderWidth: 1,
        color: '#dd7907', // Texto oscuro para mejor contraste
        fontSize: 16,
    },
    logo: {
        width: 370,
        height: 250,
        marginTop: -150,
        resizeMode: 'contain',
        
    },
    button: {
        backgroundColor: '#dd7907',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10, // Bordes redondeados
        shadowColor: '#000', // Sombra
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5, // Sombra en Android
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff', // Texto blanco
        fontSize: 18,
        fontWeight: 'bold',
      },
})

export default LoginScreen
