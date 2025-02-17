// pages/admin/gallery/index.tsx
import { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../../../lib/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGalleryItems, deleteGalleryItem } from '../../../lib/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const fetchGalleryItems = useCallback(async () => {
    try {
      const data = await getGalleryItems();
      setGallery(data);
    } catch (error) {
      console.error('Gagal mengambil data galeri:', error);
    }
  }, []);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) return;
      try {
        await deleteGalleryItem(id);
        fetchGalleryItems();
      } catch (error) {
        console.error('Gagal menghapus foto:', error);
      }
    },
    [fetchGalleryItems]
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kelola Galeri</h1>
          <Link
            to="/admin/gallery/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Foto
          </Link>
        </div>
        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={
                    typeof item.image === 'string'
                      ? `${API_URL}/storage/${item.image}`
                      : item.image
                      ? URL.createObjectURL(item.image)
                      : ''
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <Link
                    to={`/admin/gallery/edit/${item.id}`}
                    className="bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Edit className="h-5 w-5 text-gray-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
