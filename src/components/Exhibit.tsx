
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, MapIcon } from 'lucide-react';
import { Exhibit as ExhibitType, getExhibitById, getNextExhibit, exhibits, getCategoryById } from '../utils/museumData';
import { CodeFrame } from './CodeFrame';

interface ExhibitProps {
  exhibitId: string;
  onNavigateToExhibit: (id: string) => void;
  onReturnToMap: () => void;
}

export const Exhibit = ({ exhibitId, onNavigateToExhibit, onReturnToMap }: ExhibitProps) => {
  const exhibit = getExhibitById(exhibitId);
  
  if (!exhibit) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-museum-caption">Exhibit not found</p>
      </div>
    );
  }

  const nextExhibit = exhibit.next ? getExhibitById(exhibit.next) : undefined;
  const category = getCategoryById(exhibit.category);
  
  return (
    <motion.div 
      className="min-h-screen w-full px-4 py-16 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="absolute top-8 left-8"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button 
          onClick={onReturnToMap}
          className="flex items-center text-museum-caption hover:text-museum-foreground transition-colors"
        >
          <MapIcon size={16} className="mr-2" />
          <span>Museum Map</span>
        </button>
      </motion.div>

      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 pt-12">
        {category && (
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-sm text-museum-caption">
              {category.name} Collection
            </span>
          </motion.div>
        )}
        
        <motion.h1 
          className="text-2xl md:text-3xl font-light mb-12 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {exhibit.title}
        </motion.h1>
        
        <motion.div 
          className="exhibit-frame flex-1 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <CodeFrame code={exhibit.code} language={exhibit.language} />
        </motion.div>
        
        <motion.p 
          className="text-sm text-museum-caption text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {exhibit.description}
        </motion.p>
        
        <motion.div 
          className="flex justify-between items-center mt-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div></div>
          
          {nextExhibit ? (
            <motion.button 
              onClick={() => onNavigateToExhibit(nextExhibit.id)}
              className="flex items-center museum-button-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Next Exhibit</span>
              <ArrowRightIcon size={16} className="ml-2" />
            </motion.button>
          ) : (
            <motion.button 
              onClick={onReturnToMap}
              className="flex items-center museum-button-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Back to Map</span>
              <MapIcon size={16} className="ml-2" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Exhibit;
