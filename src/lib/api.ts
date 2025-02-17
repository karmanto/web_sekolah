import { Article, Event, Announcement, GalleryItem } from './types';

const API_URL = import.meta.env.VITE_API_URL + "/api";

interface FetchOptions extends RequestInit {
  body?: string;
}

// === Fungsi fetch untuk request JSON ===
export const fetchData = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (options.method && options.method !== 'GET') {
    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
  
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers,
    ...options
  });
  return response.json();
};

// === Fungsi fetch untuk request multipart/form-data (upload file) ===
export const fetchMultipartData = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  // Jangan set Content-Type karena browser akan mengatur boundary-nya secara otomatis
  const headers: HeadersInit = {};
  if (options.method && options.method !== 'GET') {
    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
  
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers,
    ...options
  });
  return response.json();
};

// ==== API Articles ====
// GET semua artikel & GET satu artikel
export const getArticles = async () => fetchData<Article[]>('articles');
export const getArticle = async (id: string) => fetchData<Article>(`articles/${id}`);

// POST & PUT artikel dengan kemungkinan upload gambar
export const addArticle = async (article: Omit<Article, 'id'> & { image?: File }) => {
  const formData = new FormData();
  formData.append('title', article.title);
  formData.append('content', article.content);
  formData.append('date', article.date);
  formData.append('author', article.author);
  if (article.image) {
    formData.append('image', article.image);
  }
  return fetchMultipartData<Article>('articles', { method: 'POST', body: formData });
};

// UPDATE artikel (menggunakan method override)
export const updateArticle = async (
  id: string,
  article: Partial<Omit<Article, 'id'> & { image?: File }>
) => {
  const formData = new FormData();
  if (article.title) formData.append('title', article.title);
  if (article.content) formData.append('content', article.content);
  if (article.date) formData.append('date', article.date);
  if (article.author) formData.append('author', article.author);
  // Hanya append image jika merupakan file baru
  if (article.image instanceof File) {
    formData.append('image', article.image);
  }
  // Tambahkan method override agar Laravel menganggapnya sebagai PUT
  formData.append('_method', 'PUT');

  return fetchMultipartData<Article>(`articles/${id}`, {
    method: 'POST',
    body: formData,
  });
};

export const deleteArticle = async (id: string) =>
  fetchData<void>(`articles/${id}`, { method: 'DELETE' });

// ==== API Events (tidak ada file upload) ====
export const getEvents = async () => fetchData<Event[]>('events');
export const getEvent = async (id: string) => fetchData<Event>(`events/${id}`);
export const addEvent = async (event: Omit<Event, 'id'>) =>
  fetchData<Event>('events', { method: 'POST', body: JSON.stringify(event) });
export const updateEvent = async (id: string, event: Partial<Event>) =>
  fetchData<Event>(`events/${id}`, { method: 'PUT', body: JSON.stringify(event) });
export const deleteEvent = async (id: string) =>
  fetchData<void>(`events/${id}`, { method: 'DELETE' });

// ==== API Announcements (tidak ada file upload) ====
export const getAnnouncements = async () => fetchData<Announcement[]>('announcements');
export const getAnnouncement = async (id: string) => fetchData<Announcement>(`announcements/${id}`);
export const addAnnouncement = async (announcement: Omit<Announcement, 'id'>) =>
  fetchData<Announcement>('announcements', { method: 'POST', body: JSON.stringify(announcement) });
export const updateAnnouncement = async (id: string, announcement: Partial<Announcement>) =>
  fetchData<Announcement>(`announcements/${id}`, { method: 'PUT', body: JSON.stringify(announcement) });
export const deleteAnnouncement = async (id: string) =>
  fetchData<void>(`announcements/${id}`, { method: 'DELETE' });

// ==== API Gallery (memerlukan upload file) ====
export const getGalleryItems = async () => fetchData<GalleryItem[]>('galleries');
export const getGalleryItem = async (id: string) => fetchData<GalleryItem>(`galleries/${id}`);
export const addGalleryItem = async (item: Omit<GalleryItem, 'id'> & { image: File }) => {
  const formData = new FormData();
  formData.append('title', item.title);
  formData.append('date', item.date);
  formData.append('image', item.image);
  return fetchMultipartData<GalleryItem>('galleries', { method: 'POST', body: formData });
};
export const updateGalleryItem = async (id: string, item: Partial<Omit<GalleryItem, 'id'> & { image?: File }>) => {
  const formData = new FormData();
  if (item.title) formData.append('title', item.title);
  if (item.date) formData.append('date', item.date);
  if (item.image instanceof File) {
    formData.append('image', item.image);
  }
  return fetchMultipartData<GalleryItem>(`galleries/${id}`, { method: 'PUT', body: formData });
};
export const deleteGalleryItem = async (id: string) =>
  fetchData<void>(`galleries/${id}`, { method: 'DELETE' });
