const AnimatedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-blue-800 transition-opacity duration-700 ease-in-out bg-white">
      <div className="w-12 h-12 mb-4 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="text-lg font-semibold animate-pulse">Loading your profile...</p>
    </div>
  );
};

export default AnimatedLoader;
