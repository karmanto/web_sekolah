import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import { getArticles } from '../lib/api';
import { Article } from '../lib/types';
import DOMPurify from 'dompurify';

const API_URL = import.meta.env.VITE_API_URL;

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError('Gagal mengambil data artikel.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Artikel - SD Islam Umar Bin Abdul Aziz</title>
        <meta name="description" content="Berita dan artikel terkini seputar prestasi dan kegiatan SD Islam Umar Bin Abdul Aziz. Ikuti perkembangan dan pencapaian terbaru siswa dan sekolah kami." />
        <meta name="keywords" content="artikel SD Islam Umar Bin Abdul Aziz, berita sekolah, prestasi siswa, kegiatan sekolah, pendidikan berkualitas" />
        <link rel="canonical" href="https://cendekianusantara.sch.id/articles" />
      </Helmet>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Artikel</h1>

        {loading && <p className="text-gray-600">Memuat artikel...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? 
              (
                articles.map((article) => (
                  <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      className="w-full h-64 object-contain rounded-lg"
                      src={
                        typeof article.image === 'string'
                          ? `${API_URL}/storage/${article.image}`
                          : article.image
                          ? URL.createObjectURL(article.image)
                          : ''
                      }
                      alt="Article"
                    />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                        {new Date(article.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-gray-600 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.content),
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/articles/${article.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                          aria-label={`Baca selengkapnya tentang ${article.title}`}
                        >
                          Baca selengkapnya
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : 
              (
                <p className="text-center text-gray-500">Tidak ada artikel saat ini.</p>
              )
            }
          </div>
        )}
      </main>
    </>
  );
}
