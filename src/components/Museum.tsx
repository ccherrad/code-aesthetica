
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntryScreen from './EntryScreen';
import MuseumMap from './MuseumMap';
import Navigation from './Navigation';
import Exhibit from './Exhibit';

type MuseumView = 'entry' | 'map' | 'category' | 'exhibit';

export const Museum = () => {
  const [view, setView] = useState<MuseumView>('entry');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedExhibit, setSelectedExhibit] = useState<string>('');

  const handleEnterMuseum = () => {
    setView('map');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setView('category');
  };

  const handleSelectExhibit = (exhibitId: string) => {
    setSelectedExhibit(exhibitId);
    setView('exhibit');
  };

  const handleReturnToMap = () => {
    setView('map');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-museum-background">
      <AnimatePresence mode="wait">
        {view === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EntryScreen onEnterMuseum={handleEnterMuseum} />
          </motion.div>
        )}
        
        {view === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MuseumMap onSelectCategory={handleSelectCategory} />
          </motion.div>
        )}
        
        {view === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation 
              categoryId={selectedCategory} 
              onSelectExhibit={handleSelectExhibit}
              onReturnToMap={handleReturnToMap}
            />
          </motion.div>
        )}
        
        {view === 'exhibit' && (
          <motion.div
            key="exhibit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Exhibit 
              exhibitId={selectedExhibit}
              onNavigateToExhibit={handleSelectExhibit}
              onReturnToMap={handleReturnToMap}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Museum;
