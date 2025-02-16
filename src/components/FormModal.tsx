import React from 'react';
import { X } from 'lucide-react';
import { FormModalProps } from '../lib/types';

// Definisi tipe data untuk form
type FormDataType = {
  title: string;
  content?: string;
  image?: string;
  date: string;
  author?: string;
  location?: string;
  description?: string;
  important?: boolean;
};

export default function FormModal({ isOpen, onClose, onSubmit, initialData, type }: FormModalProps) {
  if (!isOpen) return null;

  // State dengan tipe data yang sudah didefinisikan
  const [formData, setFormData] = React.useState<FormDataType>(
    initialData || {
      title: '',
      content: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      location: '',
      description: '',
      important: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit' : 'Tambah'} {type === 'articles' ? 'Artikel' :
              type === 'events' ? 'Agenda' :
              type === 'announcements' ? 'Pengumuman' : 'Foto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {(type === 'articles' || type === 'announcements') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Konten</label>
              <textarea
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                rows={6}
                className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {(type === 'articles' || type === 'gallery') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
              <input
                type="url"
                name="image"
                value={formData.image || ''}
                onChange={handleChange}
                className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {type === 'articles' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Penulis</label>
              <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleChange}
                className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {type === 'events' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={6}
                  className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </>
          )}

          {type === 'announcements' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                name="important"
                checked={formData.important || false}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Tandai sebagai pengumuman penting
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              {initialData ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
