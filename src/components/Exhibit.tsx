
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, MapIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Exhibit as ExhibitType, getExhibitById, getNextExhibit, exhibits, getCategoryById, getExhibitsByCategory } from '../utils/museumData';
import { CodeFrame } from './CodeFrame';
import { useState, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface ExhibitProps {
  exhibitId: string;
  onNavigateToExhibit: (id: string) => void;
  onReturnToMap: () => void;
}

export const Exhibit = ({ exhibitId, onNavigateToExhibit, onReturnToMap }: ExhibitProps) => {
  const [showNavigator, setShowNavigator] = useState(false);
  const exhibit = getExhibitById(exhibitId);
  
  if (!exhibit) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-museum-caption">Exhibit not found</p>
      </div>
    );
  }

  const category = getCategoryById(exhibit.category);
  const allExhibits = category ? getExhibitsByCategory(category.id) : [];
  const currentIndex = allExhibits.findIndex(e => e.id === exhibitId);
  const prevExhibit = currentIndex > 0 ? allExhibits[currentIndex - 1] : undefined;
  const nextExhibit = currentIndex < allExhibits.length - 1 ? allExhibits[currentIndex + 1] : undefined;
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && prevExhibit) {
        onNavigateToExhibit(prevExhibit.id);
      } else if (e.key === 'ArrowDown' && nextExhibit) {
        onNavigateToExhibit(nextExhibit.id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exhibitId, prevExhibit, nextExhibit, onNavigateToExhibit]);
  
  return (
    <motion.div 
      className="min-h-screen w-full px-4 py-16 flex flex-col relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top navigation bar */}
      <motion.div 
        className="absolute top-8 left-0 right-0 flex justify-between items-center px-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <button 
            onClick={onReturnToMap}
            className="flex items-center text-museum-caption hover:text-museum-foreground transition-colors"
          >
            <MapIcon size={16} className="mr-2" />
            <span>Museum Map</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {prevExhibit && (
            <motion.button 
              onClick={() => onNavigateToExhibit(prevExhibit.id)}
              className="flex items-center museum-button-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              title="Previous Exhibit (Up Arrow)"
            >
              <ArrowUpIcon size={16} className="mr-2" />
              <span>Previous</span>
            </motion.button>
          )}
          
          {nextExhibit && (
            <motion.button 
              onClick={() => onNavigateToExhibit(nextExhibit.id)}
              className="flex items-center museum-button-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              title="Next Exhibit (Down Arrow)"
            >
              <span>Next</span>
              <ArrowDownIcon size={16} className="ml-2" />
            </motion.button>
          )}
        </div>
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
      </div>

      {/* Bottom navigation buttons */}
      <motion.div 
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center space-x-8 px-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {prevExhibit && (
          <motion.button 
            onClick={() => onNavigateToExhibit(prevExhibit.id)}
            className="flex items-center museum-button-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            title="Previous Exhibit (Up Arrow)"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            <span>Previous: {prevExhibit.title}</span>
          </motion.button>
        )}
        
        {nextExhibit && (
          <motion.button 
            onClick={() => onNavigateToExhibit(nextExhibit.id)}
            className="flex items-center museum-button-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            title="Next Exhibit (Down Arrow)"
          >
            <span>Next: {nextExhibit.title}</span>
            <ArrowRightIcon size={16} className="ml-2" />
          </motion.button>
        )}
      </motion.div>

      {/* Right-side exhibit navigator */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-12 flex items-center justify-center"
        onMouseEnter={() => setShowNavigator(true)}
        onMouseLeave={() => setShowNavigator(false)}
      >
        <motion.div 
          className="h-full flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <div className="h-24 w-1 bg-museum-frame rounded-full opacity-30 hover:opacity-70 transition-opacity" />
        </motion.div>
        
        {/* Expanded navigator */}
        <AnimatePresence>
          {showNavigator && (
            <motion.div 
              className="absolute right-12 top-0 h-full w-64 bg-white/95 border-l border-museum-frame shadow-lg z-50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 border-b border-museum-frame">
                <h3 className="text-sm font-medium">{category?.name} Exhibits</h3>
              </div>
              
              <ScrollArea className="h-[calc(100%-3rem)] p-2">
                <div className="space-y-3 p-2">
                  {allExhibits.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        item.id === exhibitId 
                          ? 'bg-museum-soft-bg border border-museum-frame' 
                          : 'hover:bg-museum-soft-bg/50'
                      }`}
                      whileHover={{ x: 5 }}
                      onClick={() => onNavigateToExhibit(item.id)}
                    >
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-museum-caption mt-1">{item.language}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Exhibit;
