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
              Menjadi Mitra Bermutu Orang Tua dalam Menumbuhkan Karakter Generasi Islam (Karakter Iman, Karakter Belajar, Karakter Bakat).
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                +62 812 6515 9098
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                sdiubaaz@gmail.com
              </p>
              <p className="flex items-center text-gray-400">
                <MapPin className="h-10 w-10 mr-2" />
                Jl. Pusaka Pasar X Desa Bandar Khalifah Kecamatan Percut Sei Tuan Kabupaten Deli Serdang 20371
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Jam Operasional</h3>
            <div className="text-gray-400">
              <p>Senin - Kamis: 07:25 - 12:00</p>
              <p>Jumat: 07:25 - 10:45</p>
              <p>Sabtu: 07:25 - 10:30</p>
              <p>Ahad: Tutup</p>
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