import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import floatToReal from '../../utils/parseDecimaltoReal';

import styles from './styles';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

export default function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  async function loadIncidents(){

    if(loading) return;
    if(total > 0 && incidents.length === total) return;

    setLoading(true)

    const response = await api.get('incidents', {
      params: { page }
    });
    setLoading(false)
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1)
  }

  useEffect(() => {
    loadIncidents();
  })

  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.logoImg}
          source={require('../../assets/logo.png')}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
        </Text>
      </View >

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
   
      <FlatList style={styles.incidentList} 
        data={incidents}
        showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProp}>ONG:</Text>
          <Text style={styles.incidentValue}>{item.name}</Text>

          <Text style={styles.incidentProp}>Descrição:</Text>
          <Text style={styles.incidentValue}>{item.description}</Text>

          <Text style={styles.incidentProp}>Valor:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency',
              currency: 'BRL',}).format(item.value)}
            </Text>
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => navigateToDetail(item)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
        </View>
        )}/>
    </View>
  );
}
