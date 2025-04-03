import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Planets } from '../types/planets';

interface Props{
    planet:Planets;
}

const PlanteCard=({planet}:Props) => {
  
    const navigation = useNavigation<any>(); // Obtiene la navegación

  return (
    <View style={styles.cardImage}>
        <Image source={{ uri: planet.image }} style={styles.image} />
      
       <Pressable onPress={()=> navigation.navigate('DetailsPlanetScreen', {planet: planet.id })}>
                  <Text style={styles.link}>Ver Detalles</Text>
        </Pressable>
            <Text style={styles.name}>{planet.name}</Text>
    </View>
    
  )
}


const styles = StyleSheet.create({
    cardImage:{
        marginBottom:10,
        padding:10,
        backgroundColor:'#d48d3b',
        borderRadius:10,
        height:400,
        alignItems:'center',
    },
    image:{
        width:'100%',
        height:300,
        
    },
    name:{
        fontSize:32,
        fontWeight:'bold',
        marginTop:5,
        textAlign:'center',
        color:'white',
        marginBottom: 45,
        
    },
    link: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',  // Puedes usar cualquier color que desees
        textAlign: 'center',
        borderBottomWidth: 2,  // El grosor de la línea debajo del texto
        borderBottomColor: 'white',  // El color de la línea debajo
        paddingBottom: 5,  // Espacio entre el texto y la línea
        margin: 5,
      },
});

export default PlanteCard
