import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api/api';
import { Planets } from '../types/planets';
import PlanteCard from '../components/PlanetCard';

const PlanetScreen = () => {

  const [planet, setPlanets] = useState<Planets[]>([]);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [hasMore, setHasMore] = useState(true); // Si hay más personajes por cargar
  const [totalItems, setTotalItems] = useState<number>(0); // Total de personajes disponibles
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null); // URL para la siguiente página
  const limit = 5; // Definimos el número de personajes por página
  const scrollViewRef = useRef<ScrollView>(null); // Referencia al ScrollView


  const fetchPlanet = async (url: string | null = null) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true); // Empezamos la carga

      // Si no tenemos URL, tomamos la URL inicial
      const requestUrl = url || `/planets?page=1&limit=${limit}`;
      const response = await api.get(requestUrl);

      // Log para ver la respuesta completa de la API
      console.log("Respuesta completa de la API:", response.data);

      // Accedemos a los personajes en la propiedad 'items'
      let planetsData = [];
      if (response.data && Array.isArray(response.data.items)) {
        planetsData = response.data.items;  // Los personajes están en response.data.items
      } else {
        console.error('No se encontraron planetas en la respuesta de la API.');
      }

      // Si la respuesta tiene personajes, actualizamos el estado
      if (planetsData.length > 0) {
        // Añadimos los nuevos personajes al estado, evitando duplicados
        setPlanets((prev) => {
          const newPlanets = [...prev, ...planetsData];
          // Eliminar duplicados usando el id de los personajes
          return Array.from(new Set(newPlanets.map(a => a.id))).map(id => newPlanets.find(char => char.id === id));
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
      console.error('Error al obtener los planetas:', error?.message || error);
    } finally {
      setLoading(false); // Fin de la carga
    }
  };

  useEffect(() => {
    fetchPlanet();
  }, []);

  // Manejamos el evento de desplazamiento para cargar más personajes cuando se llegue al final
  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height; // Altura total del contenido
    const contentOffsetY = event.nativeEvent.contentOffset.y; // Desplazamiento vertical actual
    const viewportHeight = event.nativeEvent.layoutMeasurement.height; // Altura de la pantalla visible

    // Si estamos cerca del final y no estamos cargando más, cargamos más datos
    if (contentHeight - contentOffsetY <= viewportHeight * 1.5 && !loading && hasMore) {
      fetchPlanet(nextPageUrl); // Cargar más personajes desde la siguiente URL
    }
  };

  return (
    <View>

      {/* Mostrar el total de planetas */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 15 }}>
        Total de Planetas Cargados: {planet.length} / {totalItems}
      </Text>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={400}
        ref={scrollViewRef} // Referencia para controlar el scroll
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {planet.map((char) => (
          //aca lo que hacemos es que identifique
          //  de manera única a cada uno de los personajes
          //con el Key={char.id}
          <PlanteCard key={char.id} planet={char} />
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
       <TouchableOpacity style={styles.botonFlotante} onPress={() => fetchPlanet(nextPageUrl)}>
            <Text style={styles.buttonText}>Ir a la última página</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  botonFlotante: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1,
    width: 85,
    padding: 10,
    color: '#fff',
    backgroundColor: '#fab349', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 6, 
    elevation: 5, 
  },
  buttonText: {
    color: '#fff', // Color del texto
    fontSize: 12, // Tamaño del texto
    fontWeight: 'bold', // Estilo del texto (negrita)
    textTransform: 'uppercase', // Convierte el texto a mayúsculas
  },
});

export default PlanetScreen
