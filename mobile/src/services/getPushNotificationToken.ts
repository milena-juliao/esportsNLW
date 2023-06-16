import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken(){
    const { granted } = await Notifications.getPermissionsAsync();//pra identificar se é um dispositivo autorizado

    if(!granted) {//se não tem autorização ele solicita uma.
        await Notifications.requestPermissionsAsync();
    }

    if(granted){//se ele tem autorização será recuperado o token.
        const pushToken = await Notifications.getExpoPushTokenAsync();
        return pushToken.data
    }
}