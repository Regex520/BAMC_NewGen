import { motion } from 'framer-motion'

export default function Header({ onOpenTip, onOpenForecast }) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-6 bg-white/70 backdrop-blur-md border-b border-white/40 mb-5 sm:mb-8">
      <div className="flex items-center gap-3">
        <motion.img
          className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full shadow-md"
          src="/logo.png"
          alt="宝安中学气象社logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <div className="text-base sm:text-lg font-bold text-[#0044cc]">宝安中学气象社 BAMC</div>
      </div>
      <div className="flex gap-2.5 sm:gap-4">
        <motion.button
          onClick={onOpenForecast}
          className="btn-glass text-sm sm:text-lg px-4 py-2 sm:px-6 sm:py-2.5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          天气预报
        </motion.button>
        <motion.button
          onClick={onOpenTip}
          className="btn-glass text-sm sm:text-lg px-4 py-2 sm:px-6 sm:py-2.5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          天气提示
        </motion.button>
      </div>
    </header>
  )
}
