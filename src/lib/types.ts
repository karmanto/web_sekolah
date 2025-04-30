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

export interface GalleryImage {
  id: string
  image: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  title: string
  date: string
  images: GalleryImage[]
}

export type ContentType = 'articles' | 'events' | 'announcements' | 'galleries'

export interface FormModalProps<T = any> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: T) => void
  initialData?: T
  type: ContentType
}
