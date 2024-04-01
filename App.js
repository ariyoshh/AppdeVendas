import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { initDB } from './db/database';

import HomeScreen from './telas/Home/HomeScreen';
import CrudProdutos from './telas/CrudProdutos/CrudProdutos';
import Vender from './telas/Vender/Vender';
import Carrinho from './telas/Carrinho/Carrinho';
import TodasVendas from './telas/TodasVendas/TodasVendas';
import CrudCategorias from './telas/CrudCategorias/CrudCategorias';
import Sobre from './telas/Sobre/Sobre';

const Stack = createNativeStackNavigator();

const App = () => {
  React.useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CrudProdutos" component={CrudProdutos} />
        <Stack.Screen name="Vender" component={Vender} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
        <Stack.Screen name="TodasVendas" component={TodasVendas} />
        <Stack.Screen name="CrudCategoria" component={CrudCategorias} />
        <Stack.Screen name="Sobre" component={Sobre} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
