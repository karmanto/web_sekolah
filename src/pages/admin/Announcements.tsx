import React from 'react';
import { Announcement } from '../../lib/types';
import { Plus, Edit, Trash2, Bell } from 'lucide-react';
import FormModal from '../../components/FormModal';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../lib/api';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(getAnnouncements());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = React.useState<Announcement | null>(null);

  const handleAdd = (data: Omit<Announcement, 'id'>) => {
    const newAnnouncement = addAnnouncement(data);
    setAnnouncements(getAnnouncements());
  };

  const handleEdit = (data: Announcement) => {
    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, data);
      setAnnouncements(getAnnouncements());
      setEditingAnnouncement(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      deleteAnnouncement(id);
      setAnnouncements(getAnnouncements());
    }
  };

  const openEditModal = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Pengumuman</h1>
          <button
            onClick={() => {
              setEditingAnnouncement(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Pengumuman
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Bell className={`h-5 w-5 ${
                        announcement.important ? 'text-red-500' : 'text-gray-400'
                      } mr-3`} />
                      <div className="text-sm font-medium text-gray-900">
                        {announcement.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      announcement.important
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {announcement.important ? 'Penting' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(announcement)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAnnouncement(null);
          }}
          onSubmit={editingAnnouncement ? handleEdit : handleAdd}
          initialData={editingAnnouncement}
          type="announcements"
        />
      </div>
    </div>
  );
}