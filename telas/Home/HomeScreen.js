import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Vendas</Text>
      <Button
        title="Gerenciar Produtos"
        onPress={() => navigation.navigate('CrudProdutos')}
      />
      <Button
        title="Vender"
        onPress={() => navigation.navigate('Vender')}
      />
      <Button
        title="Carrinho"
        onPress={() => navigation.navigate('Carrinho')}
      />
      <Button
        title="Histórico de Vendas"
        onPress={() => navigation.navigate('TodasVendas')}
      />
      <Button
        title="Gerenciar Categorias"
        onPress={() => navigation.navigate('CrudCategoria')}
      />
      <Button
        title="Sobre o App"
        onPress={() => navigation.navigate('Sobre')}
      />
    </View>
  );
};

export default HomeScreen;
