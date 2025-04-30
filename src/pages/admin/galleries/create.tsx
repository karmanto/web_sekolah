import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addGalleryItem } from '../../../lib/api'

export default function CreateGallery() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files ? Array.from(e.target.files) : []
    setFiles(chosen)
    setDescriptions(chosen.map(() => ''))
  }

  const handleDescChange = (idx: number, value: string) => {
    const arr = [...descriptions]
    arr[idx] = value
    setDescriptions(arr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      alert('Harap unggah minimal satu gambar')
      return
    }

    setIsSubmitting(true)

    try {
      await addGalleryItem({ title, date, images: files, descriptions })
      navigate('/admin/gallery')
    } catch (err) {
      alert('Gagal menyimpan data. Silakan coba lagi.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Cegah back/refresh ketika submitting
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isSubmitting])

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Tambah Galeri</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            disabled={isSubmitting}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gambar</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            disabled={isSubmitting}
            className="p-2 mt-1 block w-full"
            required
          />
        </div>
        {files.map((file, idx) => (
          <div key={idx}>
            <p className="text-sm font-medium">{file.name}</p>
            <input
              type="text"
              placeholder="Deskripsi singkat"
              value={descriptions[idx]}
              onChange={e => handleDescChange(idx, e.target.value)}
              disabled={isSubmitting}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        ))}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}
