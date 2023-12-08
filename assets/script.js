const currentDay = $('#currentDay');
const updateDateTime = () => {
  const currentTime = dayjs().format('MMM, DD YYYY HH:mm:ss');
  currentDay.text(currentTime);
  currentDay.css("color", "#CC5500");
};
updateDateTime();
setInterval(updateDateTime, 1000);