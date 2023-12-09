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

for (let i = 0; i < timeBlockArray.length; i++) {
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
    let hour = dayjs().set('hour', 8 + i).format("HH[:00]");
    hourDisplay.text(hour);
    timeBlock.append(hourDisplay);

    const currentHour = dayjs().format("HH[:00]");

    console.log(hour);
    console.log(currentHour);

    if (hour < currentHour) {
        timeBlock.addClass("past")
    } else if (hour === currentHour) {
        timeBlock.addClass("present");
    } else {
        timeBlock.addClass("future");
    }
}

// Get the current time block

// Compare the time of the current block with the current time



/*
if (dayjs(currentHour).isAfter(dayjs(), "hour")) {
     currentBlock.css("background-color", "blue");
 } else {


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
