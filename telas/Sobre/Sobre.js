import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import styles from './styles'; // Garanta que este caminho está correto

const Sobre = () => {
  const [pressCount, setPressCount] = useState(0); // Contador para o número de pressionamentos
  const [showMinigame, setShowMinigame] = useState(false); // Estado para mostrar ou não o minigame

  const handlePress = () => {
    const newCount = pressCount + 1;
    setPressCount(newCount);

    if (newCount === 5) {
      setShowMinigame(true); // Ativa o minigame após 5 pressionamentos
      // Resetar o contador para permitir que o usuário reative o minigame depois de fechá-lo, se desejar
      setPressCount(0); 
    }
  };

  return (
    <View style={styles.container}>
      {showMinigame ? (
        // Exibe o conteúdo do minigame
        <Text style={styles.minigameText}>Você descobriu o easter egg! 🎉</Text>
      ) : (
        // Exibe o conteúdo sobre o aplicativo
        <>
          <Text style={styles.title}>Sobre o Sistema de Vendas</Text>
          <Text style={styles.text}>Versão: 1.0.0</Text>
          <Text style={styles.text}>Desenvolvedores:</Text>
          <Text style={styles.text}>Maria Luiza Machado Silva - 081210041</Text>
          <Text style={styles.text}>Vinycius Ariyoshi Stevani - 082190022</Text>
          <Text style={styles.text}>Este é um sistema de vendas simples desenvolvido como exemplo para demonstrar a criação de um aplicativo com React Native e Expo.</Text>
          <Button title="teste" onPress={handlePress} />
        </>
      )}
    </View>
  );
};

export default Sobre;
