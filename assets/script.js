$(document).ready(function () {
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

    // save input to local storage 
    const saveInput = function (inputEl, index) {
        let savedInput = inputEl.val();
        localStorage.setItem(`input-${index}`, savedInput);
    };

    // retrieve input from local storage 
    const printInput = function (index) {
        const inputList = $("<ul>");
        inputList.addClass("input-list");
        const inputListItem = $('<li>');
        inputListItem.addClass("input-list-item");
        const inputText = localStorage.getItem(`input-${index}`);
        inputListItem.text(inputText);
        listCheckbox = $("<input>");
        listCheckbox.attr("type", "checkbox");
        listCheckbox.addClass("list-checkbox");
        inputListItem.append(listCheckbox);
        $(`.time-block[index=${index}]`).append(inputList);
        inputList.append(inputListItem);
    };

    // read local storage
    for (let i = 0; i < timeBlockArray.length; i++) {
        printInput(i);
    }

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
            const userInputValue = userInputEl.val().trim();

            if (userInputValue !== "") {
                saveInput(userInputEl, i);
                printInput(i);
                userInputEl.val("");
                userInputEl.attr("placeholder", "Create event:");
            } else {

            }
        });
    }

    // add event listener on checkbox
    $(".time-block").on("click", ".list-checkbox", function () {
        let thisListItem = $(this).closest(".input-list-item");
        thisListItem.remove();
    });
});

