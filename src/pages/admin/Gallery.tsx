import React from 'react';
import { GalleryItem } from '../../lib/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import FormModal from '../../components/FormModal';
import { getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '../../lib/api';

export default function AdminGallery() {
  const [gallery, setGallery] = React.useState<GalleryItem[]>(getGalleryItems());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<GalleryItem | null>(null);

  const handleAdd = (data: Omit<GalleryItem, 'id'>) => {
    const newItem = addGalleryItem(data);
    setGallery(getGalleryItems());
  };

  const handleEdit = (data: GalleryItem) => {
    if (editingItem) {
      updateGalleryItem(editingItem.id, data);
      setGallery(getGalleryItems());
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      deleteGalleryItem(id);
      setGallery(getGalleryItems());
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Galeri</h1>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Foto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-white p-2 rounded-full hover:bg-gray-100"
                  >
                    <Edit className="h-5 w-5 text-gray-600" />
                  </button>
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

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={editingItem ? handleEdit : handleAdd}
          initialData={editingItem}
          type="gallery"
        />
      </div>
    </div>
  );
}