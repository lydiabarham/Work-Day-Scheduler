$(document).ready(function () {
    // Function to set current day/time 
    const updateDateTime = () => {
        const currentTime = dayjs().format('MMM, DD YYYY HH:mm:ss');
        $('#currentDay').text(currentTime);
        $('#currentDay').css("color", "#CC5500");
    };

    // Function to save input to local storage
    const saveInput = function (index, savedInput) {
        localStorage.setItem(`input-${index}`, savedInput);
    };

    // Function to retrieve input from local storage 
    const printInput = function (index) {
        const inputText = localStorage.getItem(`input-${index}`);

        if (inputText) {
            const inputList = $("<ul>");
            inputList.addClass("input-list");
            const inputListItem = $('<li>');
            inputListItem.addClass("input-list-item");
            inputListItem.text(inputText);
            const listCheckbox = $("<input>");
            listCheckbox.attr("type", "checkbox");
            listCheckbox.addClass("list-checkbox");
            inputListItem.append(listCheckbox);
            $(`.time-block[index=${index}]`).append(inputList);
            inputList.append(inputListItem);
        }
    };

    // Function to initialize time blocks
    const initializeTimeBlocks = function () {
        const timeBlockArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

        for (let i = 0; i < timeBlockArray.length; i++) {
            let timeBlock = $("<div>");
            timeBlock.addClass("time-block");
            timeBlock.attr("index", i);
            $(".container").append(timeBlock);

            let hourDisplay = $("<span>");
            hourDisplay.addClass("hour-display");
            let hour = dayjs().set('hour', 8 + i).format("HH[:00]");
            hourDisplay.text(hour);
            timeBlock.append(hourDisplay);

            const currentHour = dayjs().format("HH[:00]");

            if (hour < currentHour) {
                timeBlock.addClass("past");
            } else if (hour === currentHour) {
                timeBlock.addClass("present");
            } else {
                timeBlock.addClass("future");
            }

            const saveButton = $("<button>");
            saveButton.addClass("save-button");
            timeBlock.append(saveButton);

            const buttonText = $("<span>");
            buttonText.addClass("button-text");
            buttonText.text("Save");
            saveButton.append(buttonText);

            const userInputEl = $("<input>");
            userInputEl.addClass("input-box");
            userInputEl.attr("name", "user-input");
            userInputEl.attr("type", "text");
            userInputEl.attr("placeholder", "Create event:");
            timeBlock.append(userInputEl);

            // Retrieve and print stored input
            printInput(i);

            saveButton.on("click", function () {
                const userInputValue = userInputEl.val().trim();

                if (userInputValue !== "") {
                    saveInput(i, userInputValue);
                    printInput(i);
                    userInputEl.val("");
                    userInputEl.attr("placeholder", "Create event:");
                }
            });
        }
    };

    // Read local storage
    for (let i = 0; i < 10; i++) {
        printInput(i);
    }

    // Initialize time blocks
    initializeTimeBlocks();

    // Update current time every second
    setInterval(updateDateTime, 1000);

    // Add event listener on checkbox
    $(".time-block").on("click", ".list-checkbox", function () {
        let thisListItem = $(this).closest(".input-list-item");
        let index = thisListItem.parent().parent().attr("index");
        thisListItem.remove();
        localStorage.removeItem(`input-${index}`);
    });
});
