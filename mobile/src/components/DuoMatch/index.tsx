import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { ModalProps } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { ActivityIndicator } from 'react-native';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false);//Usado para anunciar quando o texto foi realmente copiado, pois pode ser que demore um pouco por contada da função assíncrona abaixo.

    async function handleCopyDiscordToClipboard(){//Função usada para que o discord seja copiado para a área de transferÊncia quando clicar no botão dentro do modal
        setIsCopping(true);//Exibe o loading
        await Clipboard.setImageAsync(discord);

        Alert.alert('Discord Copiado!', 'Agora é só colar no Discord para jogar com esse jogador.')
        setIsCopping(false);//Retira o loading
    }

    return (
        <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />

                    <Heading title="Let's play!" subtitle="Agora é só começar a jogar" style={{ alignItems: 'center', marginTop: 24 }} />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipboard} disabled={isCopping}>//Enquanto a função estiver sendo carregada o botão estará desabilitado.
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}//Se a função estiver ainda sendo carregada será exibido um ícone de carregamento, senão volta a aparecer o discord do anúncio.
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}