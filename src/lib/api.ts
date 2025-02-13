import content from '../data/content.json';
import { Article, Event, Announcement, GalleryItem, ContentType } from './types';

// Helper function to generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to save content
const saveContent = (newContent: typeof content) => {
  // In a real application, this would be an API call
  Object.assign(content, newContent);
};

// Articles
export const getArticles = (): Article[] => content.articles;

export const addArticle = (article: Omit<Article, 'id'>) => {
  const newArticle = { ...article, id: generateId() };
  content.articles = [...content.articles, newArticle];
  saveContent(content);
  return newArticle;
};

export const updateArticle = (id: string, article: Partial<Article>) => {
  content.articles = content.articles.map(a => 
    a.id === id ? { ...a, ...article } : a
  );
  saveContent(content);
};

export const deleteArticle = (id: string) => {
  content.articles = content.articles.filter(a => a.id !== id);
  saveContent(content);
};

// Events
export const getEvents = (): Event[] => content.events;

export const addEvent = (event: Omit<Event, 'id'>) => {
  const newEvent = { ...event, id: generateId() };
  content.events = [...content.events, newEvent];
  saveContent(content);
  return newEvent;
};

export const updateEvent = (id: string, event: Partial<Event>) => {
  content.events = content.events.map(e => 
    e.id === id ? { ...e, ...event } : e
  );
  saveContent(content);
};

export const deleteEvent = (id: string) => {
  content.events = content.events.filter(e => e.id !== id);
  saveContent(content);
};

// Announcements
export const getAnnouncements = (): Announcement[] => content.announcements;

export const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
  const newAnnouncement = { ...announcement, id: generateId() };
  content.announcements = [...content.announcements, newAnnouncement];
  saveContent(content);
  return newAnnouncement;
};

export const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
  content.announcements = content.announcements.map(a => 
    a.id === id ? { ...a, ...announcement } : a
  );
  saveContent(content);
};

export const deleteAnnouncement = (id: string) => {
  content.announcements = content.announcements.filter(a => a.id !== id);
  saveContent(content);
};

// Gallery
export const getGalleryItems = (): GalleryItem[] => content.gallery;

export const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
  const newItem = { ...item, id: generateId() };
  content.gallery = [...content.gallery, newItem];
  saveContent(content);
  return newItem;
};

export const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
  content.gallery = content.gallery.map(i => 
    i.id === id ? { ...i, ...item } : i
  );
  saveContent(content);
};

export const deleteGalleryItem = (id: string) => {
  content.gallery = content.gallery.filter(i => i.id !== id);
  saveContent(content);
};