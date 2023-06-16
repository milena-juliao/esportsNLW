import React from 'react';
import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/background-galaxy.png'
import { StatusBar } from 'react-native';

// Splash.png é usada até carregar o background desejado
import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export function Background({children}: Props) {
  return (
    <ImageBackground source={backgroundImg} defaultSource={backgroundImg} style={styles.container}>
        {children}
    </ImageBackground>
  );
}