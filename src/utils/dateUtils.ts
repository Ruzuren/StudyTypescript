const calculateDueDays = (datetime: string): string => {
  const dueDate = new Date(datetime);
  const today = new Date();
  
  const diffTime = dueDate.getTime() - today.getTime();
  
  if (diffTime < 0) {
    const overdueDays = Math.abs(Math.floor(diffTime / (1000 * 60 * 60 * 24)))-1;
    if (overdueDays === 0) {
      return 'This task is overdue today';
    }
    return `This task is overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
  }
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'This task is due today';
  if (diffDays === 1) return 'This task is due tomorrow';
  return `This task is due in ${diffDays} days`;
};

const formatDateTime = (datetime: string): string => {
  return new Date(datetime).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export { calculateDueDays, formatDateTime };
