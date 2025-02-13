import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Event } from '../lib/types';
import content from '../data/content.json';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const event = (content.events as Event[]).find(e => e.id === id);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Agenda tidak ditemukan</h2>
          <Link to="/events" className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke daftar agenda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/events" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke daftar agenda
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-6 w-6 mr-3 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-medium">
                {new Date(event.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-6 w-6 mr-3 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Lokasi</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Deskripsi Acara</h2>
          <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
        </div>
      </div>
    </div>
  );
}