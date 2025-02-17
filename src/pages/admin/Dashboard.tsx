import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Bell, Image } from 'lucide-react';
import { getArticles, getEvents, getAnnouncements, getGalleryItems } from '../../lib/api';

export default function Dashboard() {
  const [dataCounts, setDataCounts] = useState({
    articles: 0,
    events: 0,
    announcements: 0,
    galleries: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articles, events, announcements, galleries] = await Promise.all([
          getArticles(),
          getEvents(),
          getAnnouncements(),
          getGalleryItems(),
        ]);

        setDataCounts({
          articles: articles.length,
          events: events.length,
          announcements: announcements.length,
          galleries: galleries.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const modules = [
    {
      title: 'Artikel',
      icon: FileText,
      link: '/admin/articles',
      count: dataCounts.articles,
    },
    {
      title: 'Agenda',
      icon: Calendar,
      link: '/admin/events',
      count: dataCounts.events,
    },
    {
      title: 'Pengumuman',
      icon: Bell,
      link: '/admin/announcements',
      count: dataCounts.announcements,
    },
    {
      title: 'Galeri',
      icon: Image,
      link: '/admin/gallery',
      count: dataCounts.galleries,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <Link
                key={module.title}
                to={module.link}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <module.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {module.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {module.count}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
