import { useState, useEffect, useCallback } from 'react';
import { Article } from '../../../lib/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../../lib/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = useCallback(async () => {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      console.error('Gagal mengambil artikel:', error);
    }
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
      try {
        await deleteArticle(id);
        fetchArticles();
      } catch (error) {
        console.error('Gagal menghapus artikel:', error);
      }
    },
    [fetchArticles]
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kelola Artikel</h1>
          <Link
            to="/admin/articles/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Artikel
          </Link>
        </div>
        {/* Tabel Artikel */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penulis
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <img
                    src={
                        typeof article.image === 'string'
                        ? `${API_URL}/storage/${article.image}`
                        : article.image
                        ? URL.createObjectURL(article.image)
                        : ''
                    }
                    alt={article.title}
                    className="h-10 w-10 rounded object-cover"
                    />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          to={`/admin/articles/edit/${article.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
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
