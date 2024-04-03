import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background/Background';
import styles from './styles';

const db = SQLite.openDatabase('app_vendas.db');


const TodasVendas = () => {
  const [vendas, setVendas] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM vendas;',
        [],
        (_, { rows: { _array } }) => setVendas(_array),
        (_, error) => {
          console.error('Erro ao carregar vendas: ', error);
          Alert.alert('Erro', 'Erro ao carregar vendas do banco de dados.');
          return false;
        }
      );
    });
  };

  return (
    <Background>
      <View style={styles.modalContent}>
      <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Todas as Vendas</Text>
      <FlatList
        data={vendas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#f9f9f9',
              padding: 20,
              marginBottom: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('DetalhesVenda', { vendaId: item.id })
              console.log('Detalhes da venda', item.id);
            }}
          >
            <Text style={{ fontSize: 18 }}>Data: {item.data} - Total: ${item.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
      </View>
    </Background>
  );
};

export default TodasVendas;
