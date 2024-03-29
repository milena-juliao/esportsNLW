import { useRef, useEffect } from 'react';
import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import { 
    useFonts, 
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black 
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Routes } from './src/Routes';
import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';


export default function App() {
    const [fontLoaded] = useFonts({
        Inter_400Regular, 
        Inter_600SemiBold, 
        Inter_700Bold, 
        Inter_900Black 
    }) //UseFonts retorna um boolean pra dizer se as fontes já foram carregadas ou não
    
    const getNotificationListener = useRef<Subscription>();
    const responseNotificationListener = useRef<Subscription>();
    
    useEffect(() => {
        getPushNotificationToken();
    });

    useEffect(() => {
        getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => { console.log(notification) });

        responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => { console.log(response) });

        return () => {
            if(getNotificationListener.current && responseNotificationListener.current){
                Notifications.removeNotificationSubscription(getNotificationListener.current);
                Notifications.removeNotificationSubscription(responseNotificationListener.current);
            }
        }
    }, [])

    return (
        <Background>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            { fontLoaded ? <Routes /> : <Loading /> }
        </Background>
    );
}