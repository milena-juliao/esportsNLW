import { ImageBackground, TouchableOpacityProps, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: string;
    title: string;
    _count: {
        ads: number;
    };
    bannerUrl: string;//url da imagem
}

interface Props extends TouchableOpacityProps{//Criado pra encurtar a escrita das props que usei dentro do card
    data: GameCardProps;
}

export function GameCard({ data, ...rest } : Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                style={styles.cover}
                source={{ uri : data.bannerUrl }}//uri é usado para que ele reconheça como uma url
            >

                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.ads} anúncios
                    </Text>
                </LinearGradient>

            </ImageBackground>
        </TouchableOpacity>
    );
}