import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 200 },
  },
}

export default function FooterLinks({ links, title }) {
  return (
    <>
      <div className="text-lg sm:text-[22px] font-bold mb-3 sm:mb-6 text-[#0044cc] text-center sm:text-left">
        {title || '其它网站'}
      </div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links?.map((link, i) => (
          <motion.div key={i} variants={itemVariants}>
            <motion.a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card block text-center font-bold py-2.5 px-2 sm:py-4 sm:px-3 border border-[#f7e086]/60 rounded-full text-[#0044cc] no-underline bg-white/60 backdrop-blur-md text-xs sm:text-[18px] shadow-sm"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.text}
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
