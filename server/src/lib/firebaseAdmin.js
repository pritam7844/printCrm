import admin from 'firebase-admin';

let messaging = null;

try {
  // If FIREBASE_SERVICE_ACCOUNT is provided in .env, parse and initialize
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    messaging = admin.messaging();
    console.log('Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('[FCM Backend] FIREBASE_SERVICE_ACCOUNT not configured. FCM push notifications will run in simulation mode.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
}

/**
 * Dispatches an FCM push notification to a specific device registration token.
 * Falls back to simulation log output if the service account credentials are not configured.
 * 
 * @param {string} token - The browser's unique device registration FCM token.
 * @param {object} notification - Payload containing { title, body }.
 */
export const sendPushNotification = async (token, notification) => {
  if (!token) return;

  const payload = {
    token,
    notification: {
      title: notification.title,
      body: notification.body
    }
  };

  // Structured console logger
  console.log(
    `%c[FCM Backend Push Dispatch] %cSending to device %c${token}`,
    'color: #ffffff; background: #e8521a; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
    'color: #1f2724; font-weight: 500;',
    'color: #1a4ac4; font-family: monospace;',
    payload
  );

  if (messaging) {
    try {
      const response = await messaging.send(payload);
      console.log('FCM message sent successfully:', response);
      return response;
    } catch (error) {
      console.error('FCM messaging transmission failed:', error);
      throw error;
    }
  } else {
    console.log('[FCM Simulated Push] Dispatched push payload successfully to mock emulator device.');
    return 'simulated-transmission-id';
  }
};
