import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Sistema de Vendas</Text>
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
        title="Todas as Vendas"
        onPress={() => navigation.navigate('TodasVendas')}
      />
      <Button
        title="Gerenciar Categorias"
        onPress={() => navigation.navigate('CrudCategorias')}
      />
      <Button
        title="Sobre"
        onPress={() => navigation.navigate('Sobre')}
      />
    </View>
  );
};

export default HomeScreen;
