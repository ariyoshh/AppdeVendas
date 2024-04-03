import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { dropTables, initDB } from './db/database';

import HomeScreen from './telas/Home/HomeScreen';
import CrudProdutos from './telas/CrudProdutos/CrudProdutos';
import Vender from './telas/Vender/Vender';
import Carrinho from './telas/Carrinho/Carrinho';
import TodasVendas from './telas/TodasVendas/TodasVendas';
import CrudCategorias from './telas/CrudCategorias/CrudCategorias';
import Sobre from './telas/Sobre/Sobre';
import DetalhesVenda from './telas/DetalhesVenda/DetalhesVenda';

const Stack = createNativeStackNavigator();

const App = () => {
  React.useEffect(() => {
    //dropTables();
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2d5658' }, 
          headerTintColor: '#fff', 
          headerBackVisible: true, 
          headerTitleStyle: { fontFamily: 'Roboto', fontSize: 18, fontWeight: 'bold' }, 
          headerTitleAlign: 'center', 
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'MIKU DAYO VENDAS', headerBackVisible: false }}
        />
        <Stack.Screen
          name="CrudProdutos"
          component={CrudProdutos}
          options={{ headerTitle: 'MIKU 🩷  PRODUTOS'}}
        />
        <Stack.Screen
          name="Vender"
          component={Vender}
          options={{ headerTitle: 'MIKU 🩷  VENDAS'}}
        />
        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={{ headerTitle: 'MIKU 🩷  CARRINHO'}}
        />
        <Stack.Screen
          name="TodasVendas"
          component={TodasVendas}
          options={{ headerTitle: ''}}
        />
        <Stack.Screen
          name="DetalhesVenda"
          component={DetalhesVenda}
          options={{ headerTitle: 'Detalhes da Venda'}}
        />
        <Stack.Screen
          name="CrudCategorias"
          component={CrudCategorias}
          options={{ headerTitle: 'MIKU 🩷  CATEGORIAS'}}
        />
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{ headerTitle: 'SOBRE MIKU 🩷'}}
        />
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
