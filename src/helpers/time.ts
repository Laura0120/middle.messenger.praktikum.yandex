export function formatTime(timeStr: string): string {
  if (!timeStr) return '';

  const date = new Date(timeStr);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Формат "hh:mm dd:mm:yyyy"
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
