import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { httpPost, httpDelete } from '../requests';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface PushNotificationData {
  type: 'message' | 'vehicle_application' | 'purchase_interest';
  thread_id?: string;
  vehicle_id?: string;
  application_id?: string;
  interest_id?: string;
  deep_link?: string;
}

export async function registerForPushNotifications(): Promise<string | null> {
  // Check if running in Expo Go (not a development build)
  const isExpoGo = Platform.OS !== 'web' && !Device.isDevice;

  if (isExpoGo) {
    console.log('⚠️ Push notifications require a development build. Expo Go no longer supports push notifications in SDK 53+.');
    console.log('To test push notifications, run: npx expo run:android or npx expo run:ios');
    return null;
  }

  if (!Device.isDevice) {
    console.log('Push notifications only work on physical devices');
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permission');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-expo-project-id'
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#76CBED',
      });
    }

    return token.data;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    console.log('💡 If you see "expo-notifications" error, you need a development build.');
    console.log('Run: npx expo run:android (or npx expo run:ios)');
    return null;
  }
}

export async function registerTokenWithBackend(expoPushToken: string): Promise<void> {
  const platform = Platform.OS;
  const deviceId = Device.modelId || 'unknown';

  return httpPost('/push_tokens', {
    expo_push_token: expoPushToken,
    platform,
    device_id: deviceId,
  })
    .then(() => {
      console.log('Push token registered with backend');
    })
    .catch((error) => {
      console.error('Failed to register push token:', error);
    });
}

export async function unregisterToken(expoPushToken: string): Promise<void> {
  return httpDelete('/push_tokens', { expo_push_token: expoPushToken })
    .catch((error) => {
      console.error('Failed to unregister push token:', error);
    });
}

export function handleNotificationReceived(
  notification: Notifications.Notification
): void {
  console.log('Notification received:', notification);
}

export function handleNotificationResponse(
  response: Notifications.NotificationResponse
): void {
  const data = response.notification.request.content.data as PushNotificationData;

  console.log('Notification tapped:', data);

  if (data.deep_link) {
    const url = data.deep_link.replace('zonkedrivers://', '');
    router.push(url as any);
  } else {
    switch (data.type) {
      case 'message':
        if (data.thread_id) {
          router.push(`/chats/${data.thread_id}` as any);
        }
        break;
      case 'vehicle_application':
        router.push('/(tabs)/manage' as any);
        break;
      case 'purchase_interest':
        if (data.vehicle_id) {
          router.push(`/interestedBuyers?vehicle_id=${data.vehicle_id}` as any);
        }
        break;
    }
  }
}
