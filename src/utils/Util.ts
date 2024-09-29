//Get current timezone time of any country based on the offset from UTC
export const getCurrentTime = (offset: string) => {
    try {
      if (offset === "UTC") {
        return new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: true });
      }
      const offsetMatch = offset.match(/UTC([+-]\d{2}):(\d{2})/);
      if (!offsetMatch) return 'Invalid Time Zone';

      const hoursOffset = parseInt(offsetMatch[1], 10);
      const minutesOffset = parseInt(offsetMatch[2], 10);
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const adjustedTime = new Date(
        utcTime + hoursOffset * 3600000 + minutesOffset * 60000
      );
      return adjustedTime.toLocaleString('en-US', { hour12: true });
    } catch (error) {
      return 'Invalid Time Zone';
    }
};

//Get random color
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
