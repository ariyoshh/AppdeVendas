// Carrinho.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCarrinho from '../../components/Item/Item';
import handleEfetuarCompra from '../../Utils/handleEfetuarCompra';

const Carrinho = ({ navigation }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('carrinho');
      if (cartData) {
        setCarrinho(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      carrinho.forEach(item => {
        total += item.produto.preco * item.quantidade;
      });
      setValorTotal(total);
    };
    calculateTotal();
  }, [carrinho]);

  const handleRemoveItem = async (produtoId) => {
    const updatedCart = carrinho.filter(item => item.produto.id !== produtoId);
    await AsyncStorage.setItem('carrinho', JSON.stringify(updatedCart));
    setCarrinho(updatedCart);
  };

  const handleQuantityChange = async (produtoId, newQuantity) => {
    const updatedCart = carrinho.map(item => {
      if (item.produto.id === produtoId) {
        return { ...item, quantidade: newQuantity };
      }
      return item;
    });
    await AsyncStorage.setItem('carrinho', JSON.stringify(updatedCart));
    setCarrinho(updatedCart);
  };

  const handleCompra = () => {
    handleEfetuarCompra(carrinho, setCarrinho, navigation);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {carrinho.map(item => (
          <ItemCarrinho
            key={item.produto.id}
            item={item}
            onRemove={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text>Total: R${valorTotal.toFixed(2)}</Text>
        <Button title="Efetuar Compra" onPress={handleCompra} />
      </View>
    </View>
  );
};

export default Carrinho;
