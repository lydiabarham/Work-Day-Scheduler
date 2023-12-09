const currentDay = $('#currentDay');
const updateDateTime = () => {
  const currentTime = dayjs().format('MMM, DD YYYY HH:mm:ss');
  currentDay.text(currentTime);
  currentDay.css("color", "#CC5500");
};
updateDateTime();
setInterval(updateDateTime, 1000);

const timeBlockArray = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17
];

for (let i = 0; i< timeBlockArray.length; i++) {
    //create timeblocks
    let timeBlock = $("<div>");
    timeBlock.addClass("time-block");
    timeBlock.attr("index[i]"); 
    $(".container").append(timeBlock);
    //create save button
    let saveButton = $("<button>");
    saveButton.addClass("save-button");
    timeBlock.append(saveButton);
    const buttonText = $("<span>");
    buttonText.addClass("button-text");
    buttonText.text("Save");
    saveButton.append(buttonText);
    //set hour
    let hourDisplay = $("<span>");
    hourDisplay.addClass("hour-display");
    let hour = dayjs().set('hour', 8+i).format("hh[:00]a");
    hourDisplay.text(hour);
    timeBlock.append(hourDisplay);
}

/*
for (let i = 0; i< timeBlockArray.length; i++) {
    let hourDisplay = $("<span>")
    let hour = dayjs().set('hour', 8+i);
    hourDisplay.text(hour);
    timeBlock.append(hourDisplay);
}

const currentHour = dayjs().isSame($("#time"), "hour");
const displayCurrentHour = () => {
    currentHour.text("it's now");
    currentHour.css("color", "blue");
};

let hour = $("#time")
let currentHour = dayjs().hour($("#time"))
if (dayjs(currentHour, "hour").isSame(dayjs(), "hour")){
hour.text("it's now")
}



 */
