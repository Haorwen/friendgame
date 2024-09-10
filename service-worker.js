self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      self.clients.claim().then(() => {
        return self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => {
            client.navigate(client.url);
          });
        });
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    if (url.origin === 'https://fe-1255520126.file.myqcloud.com') {
      const fileName = url.pathname.split('/').pop();
      const newUrl = new URL(fileName, location.origin).href;
  
      event.respondWith(
        fetch(newUrl).catch(error => {
          console.error('Fetching failed:', error);
          throw error;
        })
      );
    }
  });
  