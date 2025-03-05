
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentModal } from './PaymentModal';

interface EntryScreenProps {
  onEnterMuseum: () => void;
}

export const EntryScreen = ({ onEnterMuseum }: EntryScreenProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center px-4 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div 
        className="text-center space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">Code Aesthetica</h1>
        <p className="text-lg md:text-xl text-museum-caption max-w-md mx-auto">
          Before AI perfects code, let's remember its imperfections.
        </p>
      </motion.div>
      
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.button
          className="museum-button"
          onClick={() => setShowPayment(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter Museum
        </motion.button>
        
        <motion.button
          className="text-museum-caption hover:text-museum-foreground transition-colors"
          onClick={() => setShowAbout(!showAbout)}
          whileHover={{ scale: 1.02 }}
        >
          About Us
        </motion.button>
      </motion.div>
      
      {showAbout && (
        <motion.div 
          className="max-w-xl mx-auto bg-museum-soft-bg border border-museum-frame p-6 rounded-lg text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-light mb-4">About Code Aesthetica</h2>
          <p className="text-sm text-museum-caption mb-4">
            Code Aesthetica is a digital museum dedicated to preserving the art of human-written code. In an era where AI increasingly generates and optimizes our code, we celebrate the quirks, elegance, and creative solutions that programmers have crafted over the decades.
          </p>
          <p className="text-sm text-museum-caption">
            Our collection spans from historical snippets that changed programming forever to elegant one-liners that demonstrate the beauty of concise expression. Each exhibit has been carefully curated to showcase not just functionality, but the aesthetic and creative dimensions of code as a human artifact.
          </p>
        </motion.div>
      )}

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentComplete={onEnterMuseum}
      />
    </motion.div>
  );
};

export default EntryScreen;
