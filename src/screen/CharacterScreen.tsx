import React, { useEffect, useState, useRef } from 'react';
import { Character } from '../types/character';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CharacterCard from '../components/CharacterCard';
import api from '../api/api';

const CharacterScreen = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // Personajes cargados
  const [loading, setLoading] = useState(false); // Estado de carga
  const [hasMore, setHasMore] = useState(true); // Si hay más personajes por cargar
  const [totalItems, setTotalItems] = useState<number>(0); // Total de personajes disponibles
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null); // URL para la siguiente página
  const limit = 5; // Definimos el número de personajes por página
  const scrollViewRef = useRef<ScrollView>(null); // Referencia al ScrollView

  // Función para obtener personajes con paginación
  const fetchCharacter = async (url: string | null = null) => {
    if (loading || !hasMore) return; // Si ya estamos cargando o no hay más personajes, no hacer nada

    try {
      setLoading(true); // Empezamos la carga

      // Si no tenemos URL, tomamos la URL inicial
      const requestUrl = url || `/characters?page=1&limit=${limit}`;
      const response = await api.get(requestUrl);

      // Log para ver la respuesta completa de la API
      console.log("Respuesta completa de la API:", response.data);

      // Accedemos a los personajes en la propiedad 'items'
      let charactersData = [];
      if (response.data && Array.isArray(response.data.items)) {
        charactersData = response.data.items;  // Los personajes están en response.data.items
      } else {
        console.error('No se encontraron personajes en la respuesta de la API.');
      }

      // Si la respuesta tiene personajes, actualizamos el estado
      if (charactersData.length > 0) {
        // Añadimos los nuevos personajes al estado, evitando duplicados
        setCharacters((prev) => {
          const newCharacters = [...prev, ...charactersData];
          // Eliminar duplicados usando el id de los personajes
          return Array.from(new Set(newCharacters.map(a => a.id))).map(id => newCharacters.find(char => char.id === id));
        });
      }

        // Solo establecemos `totalItems` la primera vez
        if (totalItems === 0) {
            setTotalItems(response.data.meta?.totalItems || 0); // Establecemos el total de personajes disponibles
          }
    
          // Actualizamos la URL de la siguiente página
          setNextPageUrl(response.data.links?.next || null); 
    
          // Si no hay más página, entonces ya no hay más personajes
          if (!response.data.links?.next) {
            setHasMore(false); // Ya no hay más personajes
          }

    } catch (error: any) {
      console.error('Error al obtener los personajes:', error?.message || error);
    } finally {
      setLoading(false); // Fin de la carga
    }
  };

  // Ejecutamos la función cuando el componente se monta por primera vez
  useEffect(() => {
    fetchCharacter(); // Cargar los personajes de la primera página
  }, []);

  // Manejamos el evento de desplazamiento para cargar más personajes cuando se llegue al final
  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height; // Altura total del contenido
    const contentOffsetY = event.nativeEvent.contentOffset.y; // Desplazamiento vertical actual
    const viewportHeight = event.nativeEvent.layoutMeasurement.height; // Altura de la pantalla visible

    // Si estamos cerca del final y no estamos cargando más, cargamos más datos
    if (contentHeight - contentOffsetY <= viewportHeight * 1.5 && !loading && hasMore) {
      fetchCharacter(nextPageUrl); // Cargar más personajes desde la siguiente URL
    }
  };

  return (
    <View>
      {/* Mostrar el total de personajes */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 15 }}>
        Total de Personajes Cargados: {characters.length} / {totalItems}
      </Text>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={400}
        ref={scrollViewRef} // Referencia para controlar el scroll
        contentContainerStyle={{ paddingBottom: 100 }} // Espacio adicional para evitar que el scroll se "corte" al final
      >
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}

        {loading && (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {!hasMore && !loading && (
          <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 35 }}>
            No hay más personajes para cargar
          </Text>
        )}
      </ScrollView>

      {/* Botón para ir a la última página */}
      <View style={styles.botonFlotante}>
        <Button title="Ir a la última página" onPress={() => fetchCharacter(nextPageUrl)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botonFlotante: {
    position: 'absolute',
    bottom: 38,
    right: 20,
    zIndex: 1,
    width: 150,
    padding: 10,
  },
});

export default CharacterScreen;
