import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Acceder a los parámetros de la navegación
import { Character } from '../types/character';
import { ScrollView } from 'react-native-gesture-handler';

const DetailsScreen = () => {
  const route = useRoute<any>();
  const { character } = route.params; // Obtiene el ID del personaje pasado como parámetro

   const navigation = useNavigation(); // Obtiene la navegación

  const [characterDetails, setCharacterDetails] = useState<Character|null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPressed, setIsPressed] = useState(false); // Estado para controlar si el botón está presionado

  useEffect(() => {
    // Fetch para obtener los detalles del personaje
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(`https://dragonball-api.com/api/characters/${character}`);
        const data = await response.json();
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [character]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!characterDetails) {
    return <Text>No se encontraron detalles del personaje.</Text>;
  }


  return (
    <ScrollView style={styles.container}> {/* Envuelve toda la vista con ScrollView */}
      <View>
        {/* Boton para volver a la pantalla anterior */}
        {/* <View style={styles.button}>
          <TouchableOpacity
            style={[styles.button, isPressed && styles.buttonPressed]} // Aplicamos estilo condicional
            onPress={() => navigation.goBack()}
            onPressIn={() => setIsPressed(true)} // Cuando el botón es presionado
            onPressOut={() => setIsPressed(false)} // Cuando se deja de presionar
          >
            <Button title={'Volver'} onPress={() => navigation.goBack()} color={'#dd7907'}></Button>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.name}>{characterDetails.name}</Text>
        <Image source={{ uri: characterDetails.image }} style={styles.imageP} />
        

        {/* Detalles del personaje */}
        <View style={styles.card}>
          <Text style={styles.detailLabel}>Ki:</Text>
          <Text style={styles.detailsValue}>{characterDetails.ki}</Text>
          {/* -------------- */}
          <View style={styles.line}></View>

          <Text style={styles.detailLabel}>Raza:</Text>
          <Text style={styles.detailsValue}>{characterDetails.race}</Text>
          {/* -------------- */}
          <View style={styles.line}></View>

          <Text style={styles.detailLabel}>Genero:</Text>
          <Text style={styles.detailsValue}>{characterDetails.gender}</Text>
          {/* -------------- */}
          <View style={styles.line}></View>

          <Text style={styles.detailLabel}>Descripción:</Text>
          <Text style={styles.detailsValue}>{characterDetails.description}</Text>
          {/* -------------- */}
          <View style={styles.line}></View>

          <Text style={styles.detailLabel}>Planeta de Origen:</Text>
          <Text style={styles.detailsValue}>{characterDetails.originPlanet.name}</Text>
          {/* -------------- */}
          <View style={styles.line}></View>
          <Image source={{ uri: characterDetails.originPlanet.image }} style={styles.imagePlanet} />
          <Text style={styles.detailsValue}>{characterDetails.originPlanet.description}</Text>
        

          <View style={styles.line}></View>
          <Text style={styles.detailLabel}>Transformaciones:</Text>
          {/* <Text style={styles.detailsValue}>{characterDetails.transformation.name}</Text> */}
          {/* <Image source={{ uri: characterDetails.transformation.image }} style={styles.imagePlanet} /> */}
        
        
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dfb07a', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
  },
  imageP: {
    width: 195,
    height: 295,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imagePlanet:{
    width: 310,
    height: 300,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#533e3e'
  },
  detailLabel:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  detailsValue:{
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  card:{
    backgroundColor: '#c78941',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width:0, height:3},
    elevation:3,
    marginBottom: 55
  },
  line:{
    height:1,
    backgroundColor: '#ddd',
    marginVertical:10,
  },
  button:{
    borderRadius: 25,
    marginTop: 3,
    marginBottom:7,
    marginHorizontal: 20,
    overflow: 'hidden',
    backgroundColor: '#dd7907'
  },
  buttonPressed:{
    backgroundColor: '#dd7907'
  }
});

export default DetailsScreen;