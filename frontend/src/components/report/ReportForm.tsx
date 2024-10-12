import { useState, ChangeEvent, FormEvent } from 'react';
import { MapPin, Paperclip, X } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  dateTime: string;
  severityLevel: string;
}

interface FileAttachment {
  id: string;
  file: File;
  type: 'photo' | 'video';
}

const ReportForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    dateTime: '',
    severityLevel: '',
  });

  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'photo' | 'video') => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type,
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    console.log(attachments);
    // send data to backend
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the activity"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category</option>
              <option value="illegal_mining">Illegal Mining</option>
              <option value="water_pollution">Water Pollution</option>
              <option value="deforestation">Deforestation</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter address"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select location on Map</label>
            <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <MapPin className="text-gray-400" size={24} />
            </div>
          </div>

          <div>
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1">Date and Time of Observation</label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="severityLevel" className="block text-sm font-medium text-gray-700 mb-1">Severity Level</label>
            <select
              id="severityLevel"
              name="severityLevel"
              value={formData.severityLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Evidence Upload</label>
          <div className="mt-1 flex justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
              <label htmlFor="photo-upload" className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span>Upload photos</span>
                <input id="photo-upload" name="photo-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'photo')} multiple />
              </label>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {attachments.filter(a => a.type === 'photo').map(attachment => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span className="text-sm truncate">{attachment.file.name}</span>
                <button type="button" onClick={() => handleRemoveAttachment(attachment.id)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video Evidence Upload</label>
          <div className="mt-1 flex justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
              <label htmlFor="video-upload" className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span>Upload videos</span>
                <input id="video-upload" name="video-upload" type="file" accept="video/*" className="sr-only" onChange={(e) => handleFileChange(e, 'video')} multiple />
              </label>
              <p className="mt-1 text-xs text-gray-500">MP4, AVI, MOV up to 50MB</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {attachments.filter(a => a.type === 'video').map(attachment => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span className="text-sm truncate">{attachment.file.name}</span>
                <button type="button" onClick={() => handleRemoveAttachment(attachment.id)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default ReportForm;