// Service Worker for caching and performance
const CACHE_NAME = 'ekavarta-real-estate-v1';
const STATIC_ASSETS = [
  '/',
  '/real-estate',
  '/properties/search',
  '/admin',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico',
];

const API_CACHE = 'ekavarta-api-v1';
const IMAGE_CACHE = 'ekavarta-images-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE && cacheName !== IMAGE_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Handle images
    if (request.destination === 'image') {
      event.respondWith(handleImageRequest(request));
    }
    // Handle API requests
    else if (url.pathname.startsWith('/api/') || url.pathname.includes('local_db')) {
      event.respondWith(handleApiRequest(request));
    }
    // Handle navigation requests
    else if (request.mode === 'navigate') {
      event.respondWith(handleNavigationRequest(request));
    }
    // Handle static assets
    else {
      event.respondWith(handleStaticRequest(request));
    }
  }
});

// Handle image requests with caching
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Service Worker: Image fetch failed', error);
    // Return a placeholder image if fetch fails
    return new Response('', { status: 404, statusText: 'Image not found' });
  }
}

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful GET requests
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Fallback to cache for GET requests
    if (request.method === 'GET') {
      const cache = await caches.open(API_CACHE);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    throw error;
  }
}

// Handle navigation requests with cache-first strategy
async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return cached fallback page
    return cache.match('/') || new Response('Offline', { status: 503 });
  }
}

// Handle static assets with cache-first strategy
async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Service Worker: Static asset fetch failed', error);
    throw error;
  }
}