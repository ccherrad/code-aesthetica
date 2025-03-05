
import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, getExhibitsByCategory } from '../utils/museumData';

interface MuseumMapProps {
  onSelectCategory: (categoryId: string) => void;
  onSelectExhibit: (exhibitId: string) => void;
}

export const MuseumMap = ({ onSelectCategory, onSelectExhibit }: MuseumMapProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  return (
    <motion.div 
      className="h-screen w-full p-8 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-12 text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-light mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Museum Map
        </motion.h1>
        <motion.p 
          className="text-museum-caption max-w-md mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Select a category to explore or browse all exhibits below
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="museum-map-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + categories.indexOf(category) * 0.1 }}
          >
            <div 
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <h3 className="font-medium mb-2">{category.name}</h3>
              <p className="text-sm text-museum-caption mb-4">{category.description}</p>
            </div>
            
            {expandedCategory === category.id && (
              <motion.div 
                className="mt-4 space-y-3 pl-3 border-l border-museum-frame"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {getExhibitsByCategory(category.id).map((exhibit) => (
                  <motion.div 
                    key={exhibit.id} 
                    className="py-2"
                    whileHover={{ x: 5, opacity: 0.8 }}
                    onClick={() => onSelectExhibit(exhibit.id)}
                  >
                    <div className="flex items-center cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-museum-accent mr-3"></div>
                      <div>
                        <p className="text-sm">{exhibit.title}</p>
                        <p className="text-xs text-museum-caption">{exhibit.language}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-2"
                  whileHover={{ opacity: 0.8 }}
                >
                  <button 
                    className="text-xs text-museum-accent"
                    onClick={() => onSelectCategory(category.id)}
                  >
                    View all in category →
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MuseumMap;
