import { motion, AnimatePresence } from "framer-motion";

const AnimatedLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center min-h-screen text-blue-800 bg-white"
        >
          <div className="w-12 h-12 mb-4 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-lg font-semibold animate-pulse">Loading your profile...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedLoader;
