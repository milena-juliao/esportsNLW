import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';
import { DuoInfo } from '../DuoInfo';
import { THEME } from '../../theme';

export interface DuoCardProps{
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChanenel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onConect: () => void;
}

export function DuoCard({ data, onConect }: Props) {
  return (
    <View style={styles.container}>
        <DuoInfo label="Nome" value={data.name} />
        <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
        <DuoInfo label="Disponibilidade" value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data. hourEnd}`} />
        <DuoInfo label="Chamada de áudio?" value={!data.useVoiceChanenel ? "Sim" : "Não"} colorValue={data.useVoiceChanenel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}/>
    
        <TouchableOpacity style={styles.button} onPress={onConect}>
            <GameController
                color={THEME.COLORS.TEXT}
                size={20}
            />

            <Text style={styles.buttonTitle}>
                Conectar
            </Text>
        </TouchableOpacity>
    </View>
  );
}