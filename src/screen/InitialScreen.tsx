import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const InitialScreen = ({ route }:any) => {
  const { user } = route.params
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/02/dragon-ball-significan-nombres-personajes-1858451.jpg?tf=1200x1200' }} style={styles.logo} />

      <Text style={styles.title}>Bienvenido {user} al API de Dragon Ball</Text>

      <Text style={styles.description}>
        Explora personajes, planetas y mucho más en el universo de Dragon Ball.
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c5843a', // Rojo vino
      padding: 20,
    },
    logo: {
      width: 450,
      height: 450,
      resizeMode: 'contain',
      marginBottom: 30,
      
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff', // Blanco para resaltar sobre fondo oscuro
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#f1f1f1',
      textAlign: 'center',
      marginBottom: 40,
      paddingHorizontal: 20,
    },
  });

export default InitialScreen
