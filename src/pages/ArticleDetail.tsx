import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../lib/types';
import content from '../data/content.json';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = (content.articles as Article[]).find(a => a.id === id);

  if (!article) {
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