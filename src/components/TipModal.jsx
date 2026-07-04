import { motion, AnimatePresence } from 'framer-motion'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
}

export default function TipModal({ isOpen, onClose, content }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] flex items-center justify-center p-3 overflow-y-auto"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="w-full max-w-[90vw] sm:max-w-[50vw] glass-card p-4 sm:p-[40px] text-base sm:text-[22px] leading-relaxed sm:leading-[1.8]"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <motion.button
              onClick={onClose}
              className="btn-glass mt-4 sm:mt-8 text-sm sm:text-[18px] w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              关闭提示
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
