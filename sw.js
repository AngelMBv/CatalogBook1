// Estrategia 0: only net
//Estrategia 1: Only Cache
//Estrategia 2: 2 first cache then network
// Estrategia 3: first network then cache
self.addEventListener('install', e => {

    const imagenes = caches.open('mi-cache').then(cache => {
        cache.add('/'),
            cache.add('index.html'),
            cache.add('sw.js'),
            cache.add('manifest.json'),
            cache.add('img/Harry.png'),
            cache.add('img/cursor.png'),
            cache.add('img/Hitler.png'),
            cache.add('img/Juegos.png'),
            cache.add('img/lenguas.png'),
            cache.add('img/Señor.png')
    })
    e.waithUntil(imagenes);
  });  
  
self.addEventListener("fetch", (event) => {
  const respuesta = fetch(event.request).then((newResp) => {
    caches.open("mi-cache").then((cache) => {
      cache.put(event.request, newResp);
    });
    return newResp.clone();
  }).catch(err=>{
    return caches.match(event.request); 
  })
  event.respondWith(respuesta);
  });