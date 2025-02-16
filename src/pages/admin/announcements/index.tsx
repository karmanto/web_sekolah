import { useEffect, useState, useCallback } from 'react';
import { Announcement } from '../../../lib/types';
import { Plus, Edit, Trash2, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAnnouncements, deleteAnnouncement } from '../../../lib/api';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Gagal mengambil pengumuman:', error);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) return;
    try {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Gagal menghapus pengumuman:', error);
    }
  }, [fetchAnnouncements]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kelola Pengumuman</h1>
          <Link
            to="/admin/announcements/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Pengumuman
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
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
                        <Bell
                          className={`h-5 w-5 ${
                            announcement.important ? 'text-red-500' : 'text-gray-400'
                          } mr-3`}
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {announcement.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          announcement.important
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {announcement.important ? 'Penting' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          to={`/admin/announcements/edit/${announcement.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
