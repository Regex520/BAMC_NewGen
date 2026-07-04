import { motion, AnimatePresence } from 'framer-motion'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 25, stiffness: 250 },
  },
  exit: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      type: 'spring',
      damping: 20,
      stiffness: 200,
    },
  }),
}

function DayCard({ day, index }) {
  return (
    <motion.div
      className="day-card bg-[#cce0ff] rounded-lg sm:rounded-xl text-center py-2 px-1 sm:py-4 sm:px-2 relative cursor-default"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="text-[11px] sm:text-[22px] mb-0.5 sm:mb-3 font-medium">{day.date}</div>
      <div className="relative inline-block">
        <div className="text-[20px] sm:text-[52px] my-0.5 sm:my-2">{day.icon}</div>
        <div className="tip-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#222] text-white text-[9px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
          {day.tip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#222]" />
        </div>
      </div>
      <div className="text-[14px] sm:text-[30px] text-[#ff7700] font-bold my-0.5 sm:my-1.5 leading-tight">{day.highTemp}</div>
      <div className="text-[14px] sm:text-[30px] text-[#0055cc] font-bold leading-tight">{day.lowTemp}</div>
    </motion.div>
  )
}

export default function ForecastModal({ isOpen, onClose, forecast }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] flex items-center justify-center p-1.5 sm:p-2 overflow-y-auto"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="w-[98vw] sm:w-[85vw] bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/60"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-gradient-to-r from-[#2277dd] to-[#1a5fb4] text-white text-sm sm:text-[32px] py-2 sm:py-5 px-3 sm:px-[30px] font-bold">
              {forecast?.title || '深圳市7天天气预报'}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-3 p-1.5 sm:p-5 bg-white/80">
              {forecast?.days?.map((day, i) => (
                <DayCard key={i} day={day} index={i} />
              )) || Array.from({ length: 7 }).map((_, i) => (
                <DayCard key={i} day={{ date: '--月--日', icon: '❓', tip: '加载中...', highTemp: '--℃', lowTemp: '--℃' }} index={i} />
              ))}
            </div>
            <div className="px-2 sm:px-[30px] text-[10px] sm:text-[18px] text-[#555] py-1 sm:py-2">
              {forecast?.releaseTime || '加载中...'}
            </div>
            <div className="px-2 sm:px-[30px] pb-2 sm:pb-4">
              <motion.button
                onClick={onClose}
                className="btn-glass text-xs sm:text-[16px] w-full sm:w-auto py-2 sm:py-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                关闭预报
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
