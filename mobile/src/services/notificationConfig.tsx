import * as Notifications from 'expo-notifications';

//Exibe notificações para o usuário
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
})