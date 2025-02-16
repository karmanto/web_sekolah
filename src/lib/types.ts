export interface Article {
  id: string;
  title: string;
  content: string;
  image?: string | File; // URL (string) dari API atau File saat upload
  date: string;
  author: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string | File; // URL (string) dari API atau File saat upload
  date: string;
}

export type ContentType = 'articles' | 'events' | 'announcements' | 'galleries';

export interface FormModalProps<T = any> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  initialData?: T;
  type: ContentType;
}
