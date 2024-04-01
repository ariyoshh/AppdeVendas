import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const Carrinho = ({ navigation }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@carrinho');
        if (jsonValue != null) setItensCarrinho(JSON.parse(jsonValue));
      } catch (e) {
        Alert.alert('Erro ao carregar o carrinho');
      }
    };
    carregarCarrinho();
  }, []);

  const removerDoCarrinho = async (id) => {
    const novoCarrinho = itensCarrinho.filter(item => item.id !== id);
    setItensCarrinho(novoCarrinho);
    try {
      const jsonValue = JSON.stringify(novoCarrinho);
      await AsyncStorage.setItem('@carrinho', jsonValue);
    } catch (e) {
      Alert.alert('Erro ao atualizar o carrinho');
    }
  };

  const finalizarCompra = () => {
    navigation.navigate('Vender', { itensCarrinho });
    setItensCarrinho([]); // Limpar o carrinho após finalizar a compra
    AsyncStorage.removeItem('@carrinho'); // Remover itens salvos do AsyncStorage
  };

  const totalCarrinho = itensCarrinho.reduce((total, item) => total + (item.quantidade * item.preco), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={itensCarrinho}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.produto} - Quantidade: {item.quantidade} - Preço: ${item.preco}</Text>
            <Button title="Remover" onPress={() => removerDoCarrinho(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.total}>Total: ${totalCarrinho.toFixed(2)}</Text>
      <Button title="Finalizar Compra" onPress={finalizarCompra} />
    </View>
  );
};

export default Carrinho;
