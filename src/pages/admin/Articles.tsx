import { useEffect, useState, useCallback } from 'react';
import { Article } from '../../lib/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import FormModal from '../../components/FormModal';
import { getArticles, addArticle, updateArticle, deleteArticle } from '../../lib/api';

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

  const handleAdd = useCallback(
    async (data: Omit<Article, 'id'>) => {
      try {
        await addArticle(data);
        fetchArticles();
      } catch (error) {
        console.error('Gagal menambahkan artikel:', error);
      }
    },
    [fetchArticles]
  );

  const handleEdit = useCallback(
    async (data: Article) => {
      if (!editingArticle) return;
      try {
        await updateArticle(editingArticle.id, data);
        fetchArticles();
        setEditingArticle(null);
      } catch (error) {
        console.error('Gagal mengupdate artikel:', error);
      }
    },
    [editingArticle, fetchArticles]
  );

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

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kelola Artikel</h1>
          <button
            onClick={() => {
              setEditingArticle(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Artikel
          </button>
        </div>

        {/* Tabel Artikel */}
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
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={article.image}
                          alt={article.title}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {article.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(article)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
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
        </div>

        {/* Modal Form */}
        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingArticle(null);
          }}
          onSubmit={editingArticle ? handleEdit : handleAdd}
          initialData={editingArticle}
          type="articles"
        />
      </div>
    </div>
  );
}
