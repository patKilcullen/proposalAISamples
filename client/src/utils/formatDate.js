export const formatDate = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const timeZone = `UTC${sign}${offsetHours.toString().padStart(2, '0')}`;
    const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${
      date.getFullYear() % 100
    } ${hours}:${minutes} ${ampm} ${timeZone}`;
    return fullDate;
  };