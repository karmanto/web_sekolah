import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SD ISLAM UMAR BIN ABDUL AZIZ</h3>
            <p className="text-gray-400">
              Menjadi Mitra Bermutu Orang Tua dalam Menumbuhkan Karakter Generasi Islam.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                (061) 1234-5678
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                info@sdiubaaz.sch.id
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                Jl. Pendidikan No. 123, Tembung
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Jam Operasional</h3>
            <div className="text-gray-400">
              <p>Senin - Jumat: 07:00 - 15:00</p>
              <p>Sabtu: 07:00 - 12:00</p>
              <p>Minggu: Tutup</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SD Islam Umar Bin Abdul Aziz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}