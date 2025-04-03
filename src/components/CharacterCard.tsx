import React from 'react'
import { Character } from '../types/character';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props{
    character:Character;
}

const CharacterCard=({character}:Props) => {
  
    const navigation = useNavigation<any>(); // Obtiene la navegación

  return (
    <View style={styles.card}>
        <Image source={{ uri: character.image }} style={styles.image} />

        <Pressable onPress={()=> navigation.navigate("DetailsScreen", {character: character.id })}>
            <Text style={styles.link}>Ver Detalles</Text>
        </Pressable>

            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.name}>Ki: {character.ki}</Text>
            <Text style={styles.name}>Raza: {character.race}</Text>
       
    </View>
    
  )
}


const styles = StyleSheet.create({
    card:{
        marginBottom:10,
        padding:10,
        backgroundColor:'#d48d3b',
        borderRadius:10,
        height:450,
        alignItems:'center',
    },
    image:{
        width:'35%',
        height:300,
        borderRadius:10,
        
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:5,
        textAlign:'center',
        color:'white'
        
    },
    link: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',  // Puedes usar cualquier color que desees
        textAlign: 'center',
        borderBottomWidth: 2,  // El grosor de la línea debajo del texto
        borderBottomColor: 'white',  // El color de la línea debajo
        paddingBottom: 5,  // Espacio entre el texto y la línea
      },
});

export default CharacterCard
