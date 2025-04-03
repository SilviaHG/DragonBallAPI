import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api/api';
import { Planets } from '../types/planets';
import PlanteCard from '../components/PlanetCard';

const PlanetScreen = () => {

    const [planet, setPlanets] = useState<Planets[]>([]);
    const [planetCount, setPlanetCount] = useState<number>(0); 
    
    useEffect(() => {
      const fetchCharacter = async () => {
          try {
              const response = await api.get('/planets');
              
  
              // Accede a los personajes usando response.data.items
              let planetsData;
              if (response.data && response.data.items) {
                planetsData = response.data.items;  
              } else {
                  // Si no se encuentra la propiedad items
                  planetsData = [];
              }
  
              // Verifica si los datos son un array antes de intentar hacer map
              if (Array.isArray(planetsData)) {
                  console.log('Datos de la API:', planetsData);
                  setPlanets(planetsData); // Actualiza el estado con los personajes
                  setPlanetCount(planetsData.length); // Actualiza el total de planetas
              } else {
                  console.error('Datos de la API no son un array:', planetsData);
              }
          } catch (error) {
              console.error('Error al obtener los personajes:', error);
          }
      };
  
      fetchCharacter();
  }, []);

  return (
    <View>

         {/* Mostrar el total de planetas */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', margin:15 }}>
        Total de Planetas: {planetCount}
      </Text>

        <ScrollView>
        {planet.map((char) => (
        //aca lo que hacemos es que identifique
        //  de manera única a cada uno de los personajes
        //con el Key={char.id}
        <PlanteCard key={char.id} planet={char}/>
        ))}
        </ScrollView>
    </View>
  )
}

export default PlanetScreen
