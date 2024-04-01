import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; // Certifique-se de que este caminho está correto

const TodasVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = async () => {
    try {
      const vendasSalvas = await AsyncStorage.getItem('@vendas');
      if (vendasSalvas !== null) {
        setVendas(JSON.parse(vendasSalvas));
      }
    } catch (e) {
      Alert.alert('Erro ao carregar vendas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Vendas</Text>
      <FlatList
        data={vendas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              // Implementação da navegação para os detalhes da venda
              // Exemplo: navigation.navigate('DetalhesVenda', { vendaId: item.id });
              console.log('Detalhes da venda', item.id);
            }}
          >
            <Text style={styles.itemText}>Data: {item.data} - Total: ${item.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodasVendas;
