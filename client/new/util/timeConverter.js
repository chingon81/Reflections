function timeConverter(timestamp) {
  const a = new Date(+timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
  const year = a.getFullYear();
  const time = `${month} ${date}, ${year} @ ${hour}:${min}`;
  return time;
}

export default timeConverter;

