import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import AdminEvents from './pages/admin/events';
import CreateEvent from './pages/admin/events/create';
import EditEvent from './pages/admin/events/edit';
import AdminAnnouncements from './pages/admin/announcements';
import CreateAnnouncement from './pages/admin/announcements/create';
import EditAnnouncement from './pages/admin/announcements/edit';
import AdminGallery from './pages/admin/Gallery';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/announcements/:id" element={<AnnouncementDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute>
                  <AdminArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events/create"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events/edit/:id"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/announcements"
              element={
                <ProtectedRoute>
                  <AdminAnnouncements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/announcements/create"
              element={
                <ProtectedRoute>
                  <CreateAnnouncement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/announcements/edit/:id"
              element={
                <ProtectedRoute>
                  <EditAnnouncement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
