
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentModal } from './PaymentModal';

interface EntryScreenProps {
  onEnterMuseum: () => void;
}

export const EntryScreen = ({ onEnterMuseum }: EntryScreenProps) => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center px-4 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div 
        className="text-center space-y-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">Code Aesthetica</h1>
        <p className="text-lg md:text-xl text-museum-caption max-w-md mx-auto">
          Before AI perfects code, let's remember its imperfections.
        </p>
      </motion.div>
      
      <motion.button
        className="museum-button"
        onClick={() => setShowPayment(true)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Enter Museum
      </motion.button>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentComplete={onEnterMuseum}
      />
    </motion.div>
  );
};

export default EntryScreen;
