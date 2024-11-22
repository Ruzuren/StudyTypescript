import { useState, useEffect } from 'react'
import { getGMT7Time, formatGMT7Time } from '../utils/timezone'

const useTimeZone = () => {
  const [time, setTime] = useState(getGMT7Time())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getGMT7Time())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return {
    gmt7Time: time,
    formattedTime: formatGMT7Time(time)
  }
}

export default useTimeZone
