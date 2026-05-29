self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {};
  const title = payload.notification?.title || 'PrintCRM Alert';
  const options = {
    body: payload.notification?.body || 'You have a new CRM update.',
    icon: '/vite.svg'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
