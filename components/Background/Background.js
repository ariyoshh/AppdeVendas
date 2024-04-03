import React from 'react';
import { ImageBackground, View } from 'react-native';
import styles from './styles'; 

const Background = ({ children }) => {
  return (
    <ImageBackground
        source={require('../../assets/mikudayo.jpg')}
        style={styles.background}
        resizeMode="cover"
        blurRadius={9}
      >
    <View style={styles.overlay} />
      {children}
    </ImageBackground>
  );
};

export default Background;