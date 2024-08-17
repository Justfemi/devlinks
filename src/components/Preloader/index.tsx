import { Loader } from'lucide-react';

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-purple w-12 h-12" />
    </div>
  );
};

export default Preloader;
