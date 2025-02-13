import React from 'react';
import { X } from 'lucide-react';
import { Article, Event, GalleryItem } from '../lib/types';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Article | Event | GalleryItem;
  type: 'article' | 'event' | 'gallery';
}

export default function DetailModal({ isOpen, onClose, item, type }: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {(type === 'article' || type === 'gallery') && (
          <img
            src={(item as Article | GalleryItem).image}
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {type === 'article' && (
          <>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Oleh: {(item as Article).author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
            </div>
            <p className="text-gray-600 whitespace-pre-line">{(item as Article).content}</p>
          </>
        )}

        {type === 'event' && (
          <>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tanggal</p>
                  <p className="text-gray-900">
                    {new Date((item as Event).date).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Lokasi</p>
                  <p className="text-gray-900">{(item as Event).location}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Deskripsi</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {(item as Event).description}
              </p>
            </div>
          </>
        )}

        {type === 'gallery' && (
          <div className="text-sm text-gray-500">
            Ditambahkan pada: {new Date(item.date).toLocaleDateString('id-ID')}
          </div>
        )}
      </div>
    </div>
  );
}