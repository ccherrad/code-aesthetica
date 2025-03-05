
import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, Category, getWorkflowPath, getExhibitById } from '../utils/museumData';

interface MuseumMapProps {
  onSelectCategory: (categoryId: string) => void;
}

export const MuseumMap = ({ onSelectCategory }: MuseumMapProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
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
          Explore our collection by category - follow the workflow connections between exhibits
        </motion.p>
      </div>

      <div className="relative flex-1 border border-museum-frame rounded-lg overflow-hidden bg-museum-soft-bg">
        {/* Floor map base */}
        <div className="absolute inset-0 p-6">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            className="opacity-20"
          >
            <path d="M10,10 L90,10 L90,90 L10,90 Z" stroke="#86868B" strokeWidth="0.5" fill="none" />
            <path d="M30,10 L30,90" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
            <path d="M50,10 L50,90" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
            <path d="M70,10 L70,90" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
            <path d="M10,30 L90,30" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
            <path d="M10,50 L90,50" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
            <path d="M10,70 L90,70" stroke="#86868B" strokeWidth="0.2" fill="none" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Workflow connections between exhibits */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          className="absolute inset-0 pointer-events-none"
        >
          {categories.map((category) => {
            const workflowPath = getWorkflowPath(category.id);
            return workflowPath.slice(0, -1).map((exhibit, index) => {
              const nextExhibit = workflowPath[index + 1];
              if (!exhibit.position || !nextExhibit.position) return null;
              
              return (
                <motion.path 
                  key={`${exhibit.id}-to-${nextExhibit.id}`}
                  d={`M${exhibit.position.x},${exhibit.position.y} L${nextExhibit.position.x},${nextExhibit.position.y}`}
                  stroke={hoveredCategory === category.id ? "#007AFF" : "#86868B"}
                  strokeWidth="1"
                  strokeDasharray="4,2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: hoveredCategory === category.id ? 0.9 : 0.3 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.8 + (index * 0.2) 
                  }}
                />
              );
            });
          })}
        </svg>

        {/* Category markers */}
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${category.position.x}%`, 
              top: `${category.position.y}%` 
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + (categories.indexOf(category) * 0.1) }}
          >
            <motion.div
              className={`w-40 h-24 museum-map-item ${hoveredCategory === category.id ? 'ring-2 ring-museum-accent' : ''}`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-xs text-museum-caption">{category.description}</p>
            </motion.div>
          </motion.div>
        ))}

        {/* Exhibit markers (only show when category is hovered) */}
        {hoveredCategory && getWorkflowPath(hoveredCategory).map((exhibit) => {
          if (!exhibit.position) return null;
          
          return (
            <motion.div
              key={exhibit.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${exhibit.position.x}%`, 
                top: `${exhibit.position.y}%` 
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 0.8, opacity: 0.8 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-museum-accent flex items-center justify-center 
                          text-white text-xs font-medium border border-white cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                {getWorkflowPath(hoveredCategory).indexOf(exhibit) + 1}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MuseumMap;
