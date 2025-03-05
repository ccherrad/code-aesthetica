
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getExhibitsByCategory } from '../utils/museumData';

interface NavigationProps {
  categoryId: string;
  onSelectExhibit: (exhibitId: string) => void;
  onReturnToMap: () => void;
}

export const Navigation = ({ categoryId, onSelectExhibit, onReturnToMap }: NavigationProps) => {
  const exhibits = getExhibitsByCategory(categoryId);

  return (
    <motion.div 
      className="min-h-screen w-full p-8 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-12 text-center">
        <motion.button 
          className="text-sm text-museum-caption hover:text-museum-foreground mb-8 inline-flex"
          onClick={onReturnToMap}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ← Return to Museum Map
        </motion.button>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-light mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {exhibits.length > 0 ? exhibits[0].category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') : 'Exhibits'}
        </motion.h1>
        
        <motion.p 
          className="text-museum-caption max-w-md mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Select an exhibit to view
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {exhibits.map((exhibit, index) => (
          <motion.div 
            key={exhibit.id}
            className="museum-map-item flex flex-col h-full"
            onClick={() => onSelectExhibit(exhibit.id)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-medium mb-2">{exhibit.title}</h3>
            <p className="text-xs text-museum-caption flex-1">{exhibit.description}</p>
            <div className="text-xs mt-4 text-museum-accent">{exhibit.language}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Navigation;
