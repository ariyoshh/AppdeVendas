import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import Background from '../../components/Background/Background';

const HomeScreen = ({ navigation }) => {
  return (
      <Background>
        <View style={styles.container}>
          <Image
          source={require('../../assets/mikudayo.jpg')}
          style={styles.logo}
          resizeMode="contain"
          />
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('CrudProdutos')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-create" size={24} color="white" /> 
            <Text style={styles.buttonText}>Gerenciar Produtos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('Vender')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-basket" size={24} color="white" /> 
            <Text style={styles.buttonText}>Vender</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('Carrinho')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-cart" size={24} color="white" />
            <Text style={styles.buttonText}>Carrinho</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('TodasVendas')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-list" size={24} color="white" /> 
            <Text style={styles.buttonText}>Histórico de Vendas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('CrudCategorias')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-layers" size={24} color="white" /> 
            <Text style={styles.buttonText}>Categorias</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blur]}
          onPress={() => navigation.navigate('Sobre')}>
          <View style={styles.buttonContent}>
            <Ionicons name="md-information-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Sobre o App</Text>
          </View>
        </TouchableOpacity>
      </View>
      </Background>
  );
};
export default HomeScreen;
