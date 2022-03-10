// Adds multiple numbers
function add(...numbers) {
    return numbers.reduce((sum, number) => (sum += number), 0);
}

// Multiplies multiple numbers
function multp(...numbers) {
    return numbers.reduce((product, number) => (product *= number), 1);
}

// Subtracts multiple numbers
function subt(...numbers) {
    return numbers.reduce((difference, number) => (difference -= number));
}

// Divides multiple numbers
function divide(...numbers) {
    return numbers.reduce((quotient, number) => (quotient /= number));
}

// Makes an operation based on the input
function operate(opr, ...numbers) {
    let a = numbers[0];
    let b = numbers[1];

    switch (opr) {
        case "+":
            return add(a, b);

        case "*":
            return multp(a, b);

        case "-":
            return subt(a, b);

        case "/":
            return divide(a, b);
    }
}

// Makes all the buttons work
function manage_btns(display_panel) {
    // All the buttons
    let all_buttons = document.querySelectorAll(".calc_btn");
    all_buttons = [...all_buttons];

    // When clicked (most of them) appear on the display
    all_buttons.forEach((button) => {
        button.addEventListener("click", (e) => pop_display(e, display_panel));
    });

    let equals_btn = document.querySelectorAll(".opr");
    equals_btn = [...equals_btn];

    // Ther operator clicked
    let operator = "";

    let dp_val = "";
    let opr = "";

    // Displays the result when "=" is clicked
    // or the user types an operation with more than 2 pairs of numbers
    equals_btn.forEach((button) =>
        button.addEventListener("click", (e) => {
            let display_value = display_panel.textContent;

            operator = e.target.textContent;

            dp_val = display_panel.textContent.slice(0, display_value.length);

            isNaN(+display_value[0])
                ? (display_panel.textContent = "")
                : (dp_val = dp_val);

            let sides = [];
            let left = null;
            let right = null;
            let helper = "";

            let possibilities = ["+", "*", "-", "/"];

            switch (true) {
                // if the user types an operator when there is already another on the screen
                case operator === "+" ||
                    operator === "*" ||
                    operator === "-" ||
                    operator === "/":
                    for (let i = 0; i < possibilities.length; i++) {
                        sides = dp_val.slice(0, -1).split(possibilities[i]);

                        // What is the operator already on screen
                        helper = possibilities[i];

                        left = +sides[0];

                        // Defaults right to 1 if * or / are select
                        // but not the second number of the operation
                        if (helper === "*" || helper === "/") {
                            sides[1] === "" ? (right = 1) : (right = +sides[1]);
                        } else {
                            right = +sides[1];
                        }

                        // Will continue until both sides of the operation are numbers
                        if (!isNaN(left || right)) {
                            break;
                        }
                    }

                    // If it is possible to make a math operation to be solved
                    sides.length === 2
                        ? (display_panel.textContent = `${
                              Math.round(
                                  operate(helper, left, right) * 10 ** 14
                              ) /
                              10 ** 14
                          }${operator}`)
                        : (right = right);
                    break;

                // Clicks the "=" btn
                case operator === "=":
                    for (let i = 0; i < dp_val.length; i++) {
                        let current_char = dp_val.charAt(i);

                        // Looks at what is in the screen an look for the operatos
                        // (everything that is not a number or ".")
                        if (current_char !== ".") {
                            isNaN(+current_char)
                                ? (opr = current_char)
                                : (i = i);
                        }
                    }

                    // Throws the numbers into an array with the lenght of 2
                    sides = display_value.split(opr);
                    left = +sides[0];
                    right = +sides[1];

                    switch (true) {
                        // Garantees that is not possible to use the "="
                        // when there are not enough number on screen
                        case sides.length === 1:
                            break;

                        // Dont divide by 0, never.
                        case opr === "/" && right === 0:
                            display_panel.textContent = "no";
                            break;

                        // Use the operate() function on the numbers in the array
                        // using the provided operator
                        case sides.length === 2:
                            display_panel.textContent =
                                Math.round(
                                    operate(opr, left, right) * 10 ** 14
                                ) /
                                10 ** 14;
                            break;
                    }

                    break;
            }
        })
    );

    // Clears everything
    let clear_btn = document.querySelector(".clr");
    clear_btn.addEventListener("click", () => (display_panel.textContent = ""));

    // Backspace
    let backspace = document.querySelector(".bksp");
    backspace.addEventListener("click", () => {
        let bkp = display_panel.textContent.slice(0, -1);

        display_panel.textContent = bkp;
    });
}

// Manages what appears on the display and how
function pop_display(e, display_panel) {
    isNaN(+display_panel.textContent[0])
        ? (display_panel.textContent = "")
        : (e = e);

    let btn = e.target.textContent;

    // Special case for the "." button
    // can only appear once per number
    //that was a pain to make work
    if (btn === ".") {
        let display_value = display_panel.textContent;

        dp_val = display_panel.textContent.slice(0, display_value.length + 1);

        let sides = [];
        let left = null;
        let right = null;

        let possibilities = ["+", "*", "-", "/"];

        for (let i = 0; i < possibilities.length; i++) {
            sides = dp_val.split(possibilities[i]);

            left = sides[0];
            right = sides[1];

            if (!isNaN(left || right)) {
                break;
            }
        }

        if (right !== undefined && !right.includes(btn)) {
            display_panel.textContent += btn;
        } else if (!left.includes(btn)) {
            display_panel.textContent += btn;
        }
    } else if (!(btn === "Clear" || btn === "=" || btn === "Backspace")) {
        // Except those 3, all the other buttons should appear on the screen
        display_panel.textContent += btn;
    }
}

function main() {
    let display_panel = document.querySelector(".panel");
    manage_btns(display_panel);
}

main();
