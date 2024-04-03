import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import styles from './styles';

const Sobre = () => {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Sobre o Sistema de Vendas</Text>
          <Text style={styles.text}>Versão: 1.0.0</Text>
          <Text style={styles.text}>Desenvolvedores:</Text>
          <Text style={styles.text}>Maria Luiza Machado Silva - 081210041</Text>
          <Text style={styles.text}>Vinycius Ariyoshi Stevani - 082190022</Text>
          <Text style={styles.text}>Este é um sistema de vendas simples desenvolvido como exemplo para demonstrar a criação de um aplicativo com React Native e Expo.</Text>
    </View>
  );
};

export default Sobre;
