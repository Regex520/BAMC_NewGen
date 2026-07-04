import { motion } from 'framer-motion'

const dataItems = [
  { label: '相对湿度', key: 'humidity' },
  { label: '时雨量', key: 'hourlyRain' },
  { label: '日雨量', key: 'dailyRain' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 20, stiffness: 200 },
  },
}

export default function WeatherCard({ data }) {
  return (
    <motion.div
      className="glass-card flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-[60px] mb-6 sm:mb-[100px] max-w-fit px-4 py-6 sm:px-[60px] sm:py-[40px] w-full sm:max-w-fit mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="text-center">
        <motion.div
          className="text-[56px] sm:text-[88px] font-bold text-[#0044cc]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 150, delay: 0.2 }}
        >
          {data?.temperature || '--℃'}
        </motion.div>
        <div className="text-lg sm:text-[26px] mt-2 sm:mt-3 font-kai text-[#444]">{data?.wind || '--'}</div>
      </div>
      <motion.div
        className="text-base sm:text-[26px] leading-relaxed sm:leading-[2.2] text-center sm:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dataItems.map(({ label, key }) => (
          <motion.div key={key} variants={itemVariants}>
            <span className="inline-block w-[100px] sm:w-[140px] font-kai text-[#666] font-medium text-sm sm:text-[26px]">{label}</span>
            <span className="font-kai text-[#333] text-sm sm:text-[26px]">{data?.[key] || '--'}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
