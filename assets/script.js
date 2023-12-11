// set current day/time 
const currentDay = $('#currentDay');
const updateDateTime = () => {
    const currentTime = dayjs().format('MMM, DD YYYY HH:mm:ss');
    currentDay.text(currentTime);
    currentDay.css("color", "#CC5500");
};
updateDateTime();
setInterval(updateDateTime, 1000);

const timeBlockArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

for (let i = 0; i < timeBlockArray.length; i++) {
    // create time blocks
    let timeBlock = $("<div>");
    timeBlock.addClass("time-block");
    timeBlock.attr("index", i);
    $(".container").append(timeBlock);

    // set hour display 
    let hourDisplay = $("<span>");
    hourDisplay.addClass("hour-display");
    let hour = dayjs().set('hour', 8 + i).format("HH[:00]");
    hourDisplay.text(hour);
    timeBlock.append(hourDisplay);
    
    // use if statement to show past, present and future
    const currentHour = dayjs().format("HH[:00]");
    
    if (hour < currentHour) {
        timeBlock.addClass("past");
    } else if (hour === currentHour) {
        timeBlock.addClass("present");
    } else {
        timeBlock.addClass("future");
    }

    // create save button 
    const saveButton = $("<button>");
    saveButton.addClass("save-button");
    timeBlock.append(saveButton);
    const buttonText = $("<span>");
    buttonText.addClass("button-text");
    buttonText.text("Save");
    saveButton.append(buttonText);

    // create input element 
    const userInputEl = $("<input>");
    userInputEl.addClass("input-box");
    userInputEl.attr("name", "user-input");
    userInputEl.attr("type", "text");
    userInputEl.attr("placeholder", "Create event:")
    timeBlock.append(userInputEl);

    // add event listener 
    saveButton.on("click", function () {
        saveInput(userInputEl, i);
        printInput(i);
    });
}

// save input to local storage 
const saveInput = function (inputEl, index) {
    let savedInput = inputEl.val();
    localStorage.setItem(`input-${index}`, JSON.stringify(savedInput));
}

// retrieve input from local storage 
const printInput = function (index) {
    const inputList = $("<ol>");
    inputList.addClass("input-list");
    const inputListItem = $('<li>');
    inputListItem.addClass("input-list-item");
    const inputText = localStorage.getItem(`input-${index}`);
    inputListItem.text(inputText);
    $(`.time-block[index=${index}]`).append(inputList); 
    inputList.append(inputListItem);
};
