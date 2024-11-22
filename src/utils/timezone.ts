export const getGMT7Time = (): Date => {
  const date = new Date()
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))
}

export const formatGMT7Time = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(date)
}
