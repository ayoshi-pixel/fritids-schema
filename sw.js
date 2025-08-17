self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("schema-cache").then(cache => {
      return cache.addAll([
        "/",
        "/static/style.css",
        "/static/script.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
