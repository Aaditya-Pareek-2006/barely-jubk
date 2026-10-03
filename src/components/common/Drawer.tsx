import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'right' | 'left';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const slideVariants = {
    closed: { x: position === 'right' ? '100%' : '-100%' },
    open: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={slideVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`fixed inset-y-0 ${
              position === 'right' ? 'right-0 border-l-4' : 'left-0 border-r-4'
            } w-full max-w-md bg-paper border-brand-black shadow-2xl z-10 flex flex-col`}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-brand-black bg-brand-lime">
              <h2 className="font-display font-black text-xl uppercase tracking-wider text-brand-black">
                {title || 'DRAWER'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 bg-brand-black text-white hover:bg-brand-orange transition-colors border border-brand-black"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
