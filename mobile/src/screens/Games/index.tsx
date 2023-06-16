import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Entypo} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

interface RouteParams {
    id: string;
    title: string;
    bannerUrl: string
}

export function Games() {
    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId: string){
        fetch(`http://192.168.15.7:3333/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.15.7:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20}/>
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo}/>

                    <View style={styles.right}/>
                </View>

                <Image source={{uri : game.bannerUrl}} style={styles.cover} resizeMode='cover'/>

                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>

                <FlatList 
                    data={duos} 
                    style={styles.containerList}
                    keyExtractor={item => item.id} 
                    renderItem={({item}) => (<DuoCard data={item} onConect={() => getDiscordUser(item.id)}/>)} 
                    horizontal 
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]} 
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )} 
                />

                <DuoMatch discord={discordDuoSelected} visible={false} onClose={() => setDiscordDuoSelected('')}/>
                
            </SafeAreaView>

        </Background>
    );
} 