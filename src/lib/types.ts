export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
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
  image: string;
  date: string;
}

export type ContentType = 'articles' | 'events' | 'announcements' | 'gallery';

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  type: ContentType;
}