
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export const PaymentModal = ({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      // Proceed to museum after payment animation
      setTimeout(() => {
        onPaymentComplete();
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-museum-frame bg-museum-background">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-light mb-6">Museum Entry</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <AnimatePresence mode="wait">
            {!isProcessing && !isComplete && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-museum-caption">
                  Entry fee: 1€
                </p>
                <div className="flex justify-center">
                  <button 
                    className="museum-button"
                    onClick={handlePayment}
                  >
                    Pay & Enter
                  </button>
                </div>
                <p className="text-xs text-center text-museum-caption mt-6">
                  This is a simulated payment. No actual payment will be processed.
                </p>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div 
                className="flex flex-col items-center justify-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-12 w-12 rounded-full border-4 border-museum-soft-bg border-t-museum-accent animate-spin mb-6"></div>
                <p className="text-museum-caption">Processing payment...</p>
              </motion.div>
            )}

            {isComplete && (
              <motion.div 
                className="flex flex-col items-center justify-center py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-museum-caption">Payment successful</p>
                <p className="text-museum-caption text-sm mt-2">Entering museum...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
