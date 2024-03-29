import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);
    const navigation = useNavigation();

    function handleOpenGame({id, title, bannerUrl}: GameCardProps){
        navigation.navigate('game', {id, title, bannerUrl});
    }

    useEffect(() => {
        fetch('http://192.168.15.7:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, [])

    return (
        <Background>

            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <Heading
                    title="Encontre seu duo"
                    subtitle="Selecione o game que deseja jogar..."
                />

                {/* gera uma lista com todos os jogos. O renderItem diz quais elementos serão apresentados na lista */}
                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
        </Background>
    );
}