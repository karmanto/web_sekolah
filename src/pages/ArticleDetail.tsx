import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { getArticle } from '../lib/api';
import { Article } from '../lib/types';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id as string);
        setArticle(data);
      } catch (err) {
        setError('Artikel tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Memuat artikel...</p>;
  }

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h2>
          <Link to="/articles" className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke daftar artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/articles" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke daftar artikel
      </Link>

      <article>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
          loading="lazy"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-500 mb-8">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{new Date(article.date).toLocaleDateString('id-ID')}</span>
          <span className="mx-2">•</span>
          <span>Oleh: {article.author}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 whitespace-pre-line">{article.content}</p>
        </div>
      </article>
    </div>
  );
}
