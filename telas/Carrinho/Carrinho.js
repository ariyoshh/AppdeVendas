import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertVenda, insertItensVenda } from '../../db/database';
import styles from './styles';
import { getCurrentDateAndTime } from '../../Utils/dateUtils';
import Background from '../../components/Background/Background';

const Carrinho = () => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    const carrinho = JSON.parse(await AsyncStorage.getItem('carrinho')) || [];
    setItensCarrinho(carrinho);
  };

  const atualizarQuantidade = async (id, quantidade) => {
    const novaQuantidade = Math.max(1, quantidade);
    const carrinhoAtualizado = itensCarrinho.map(item => {
      if (item.id === id) {
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });
    setItensCarrinho(carrinhoAtualizado);
    await AsyncStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  };


  const removerDoCarrinho = async (id) => {
    const carrinhoAtualizado = itensCarrinho.filter(item => item.id !== id);
    setItensCarrinho(carrinhoAtualizado);
    await AsyncStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  };

  const limparCarrinho = async () => {
    await AsyncStorage.removeItem('carrinho');
    setItensCarrinho([]);
  };

const efetivarVenda = async () => {
  if (itensCarrinho.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }

  console.log('Iniciando efetivação da venda...');

  try {
    const totalVenda = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    console.log('Total da venda:', totalVenda);

    const vendaId = await insertVenda(getCurrentDateAndTime(), totalVenda);
    console.log('ID da venda:', vendaId);

    for (const item of itensCarrinho) {
      await insertItensVenda(vendaId, item.id, item.quantidade);
    }

    alert('Venda efetivada com sucesso!');
    await limparCarrinho();
  } catch (error) {
    console.error('Erro ao efetivar venda:', error);
    alert('Houve um erro ao efetivar a venda. Por favor, tente novamente.');
  }
};
  const calcularTotal = () => itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2);

  return (
    <Background>
      <View style={styles.container}>
      <View style={styles.modalContent}>
      <FlatList
        data={itensCarrinho}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nomeProduto}>{item.nome}  R${item.preco.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                onChangeText={(text) => atualizarQuantidade(item.id, parseInt(text) || 1)}
                value={item.quantidade.toString()}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />


      <Text>Total: R$ {calcularTotal()}</Text>
      <TouchableOpacity style={styles.button} onPress={limparCarrinho}>
        <Text style={styles.buttonText}>Limpar Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={efetivarVenda}>
        <Text style={styles.buttonText}>Efetivar Venda</Text>
      </TouchableOpacity>
    </View>
    </View>
    </Background>
  );
};


export default Carrinho;
