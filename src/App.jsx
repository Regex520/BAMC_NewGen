import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import TipModal from './components/TipModal'
import ForecastModal from './components/ForecastModal'
import FooterLinks from './components/FooterLinks'

const backgrounds = ['/bg.jpg', '/bg2.jpg']

export default function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [tipOpen, setTipOpen] = useState(false)
  const [forecastOpen, setForecastOpen] = useState(false)
  const [error, setError] = useState(false)
  const [bg] = useState(() => backgrounds[Math.floor(Math.random() * backgrounds.length)])

  useEffect(() => {
    fetch('/weather-data.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ 天气数据加载成功', data)
        setWeatherData(data)
      })
      .catch((err) => {
        console.error('❌ 加载天气数据失败：', err)
        setError(true)
      })
  }, [])

  return (
    <div
      className="bg-cover bg-[position:right_center] sm:bg-center bg-fixed bg-no-repeat text-black max-w-[1600px] mx-auto p-3 sm:p-5 min-h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header onOpenTip={() => setTipOpen(true)} onOpenForecast={() => setForecastOpen(true)} />

      <TipModal
        isOpen={tipOpen}
        onClose={() => setTipOpen(false)}
        content={weatherData?.weatherTip?.content || '加载中...'}
      />

      <ForecastModal
        isOpen={forecastOpen}
        onClose={() => setForecastOpen(false)}
        forecast={weatherData?.forecast}
      />

      <motion.div
        className="text-xl sm:text-[36px] font-bold mb-4 sm:mb-[50px] text-center sm:text-left text-[#0044cc]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {weatherData?.realtimeData?.stationTitle || '宝安中学实况'}
      </motion.div>

      {error ? (
        <motion.div
          className="text-center py-12 sm:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-[60px] sm:text-[80px] font-bold">⚠️</div>
          <div className="text-base sm:text-xl text-[#0044cc] font-bold mt-3 sm:mt-4">数据加载失败，请刷新重试</div>
        </motion.div>
      ) : (
        <WeatherCard data={weatherData?.realtimeData} />
      )}

      <div className="relative my-4 sm:my-8">
        <div className="text-center sm:absolute sm:right-0 sm:bottom-2 sm:bottom-3 text-[11px] sm:text-[18px] font-bold text-[#0044cc] px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/70 backdrop-blur-sm rounded-md sm:rounded-lg shadow-sm sm:inline-block">
          {weatherData?.realtimeData?.publishTime || '加载中...'}
        </div>
        <div className="divider-gradient mt-1 sm:mt-0" />
      </div>

      <div className="mt-8 sm:mt-16 pb-8 sm:pb-0">
        <FooterLinks
          links={weatherData?.functionLinks?.links}
          title={weatherData?.functionLinks?.title}
        />
      </div>
    </div>
  )
}
