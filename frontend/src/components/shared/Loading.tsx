import { Loader } from 'lucide-react';

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <Loader className="w-12 h-12 text-light-blue animate-spin" />
    <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
  </div>
);

export default Loading;