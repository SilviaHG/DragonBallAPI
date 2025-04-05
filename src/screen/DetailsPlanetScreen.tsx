import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Acceder a los parámetros de la navegación
import { ScrollView } from 'react-native-gesture-handler';
import { Planets } from '../types/planets';

const DetailsPlantScreen = () => {
  const route = useRoute<any>();
  const { planet } = route.params; // Obtiene el ID del personaje pasado como parámetro

   const navigation = useNavigation(); // Obtiene la navegación

  const [planetDetails, setPlanetDetails] = useState<Planets|null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPressed, setIsPressed] = useState(false); // Estado para controlar si el botón está presionado

  useEffect(() => {
    // Fetch para obtener los detalles del personaje
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(`https://dragonball-api.com/api/planets/${planet}`);
        const data = await response.json();

        setPlanetDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
        setLoading(false);
      }
    };

    fetchPlanetDetails();
  }, [planet]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!planetDetails) {
    return <Text>No se encontraron detalles del planeta.</Text>;
  }


  return (
    <ScrollView style={styles.container}> 
      <View>
      

        <Text style={styles.name}>{planetDetails.name}</Text>
        <Image source={{ uri: planetDetails.image }} style={styles.imagePlanet} />
        
       
        
        <View style={styles.card}>
         
          <View style={styles.line}></View>

          <Text style={styles.detailLabel}>Descripción:</Text>
          <Text style={styles.detailsValue}>{planetDetails.description}</Text>
         
          <View style={styles.line}></View>
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
  imagePlanet:{
    width: 310,
    height: 300,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#533e3e',
  },
  detailLabel:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  detailsValue:{
    fontSize: 18,
    color: '#333'
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
    overflow: 'hidden'
  },
  buttonPressed:{
    backgroundColor: '#0056b3'
  }
});

export default DetailsPlantScreen;