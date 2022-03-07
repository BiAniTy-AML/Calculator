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
let dp_ctt = "";

function manage_btns(display_panel) {
    let numbers_btns = document.querySelectorAll(".calc_btn");
    numbers_btns = [...numbers_btns];

    numbers_btns.forEach((button) => {
        button.addEventListener("click", (e) => pop_display(e, display_panel));
    });

    let equals_btn = document.querySelectorAll(".opr");
    equals_btn = [...equals_btn];

    let operator = "";
    let dp_val = "";
    let opr = "";

    equals_btn.forEach((button) =>
        button.addEventListener("click", (e) => {
            let display_value = display_panel.textContent;
            operator = e.target.textContent;

            dp_val = display_panel.textContent.slice(0, display_value.length);

            let sides = [];
            let left = null;
            let right = null;
            let helper = "";

            let possibilities = ["+", "*", "-", "/"];

            switch (true) {
                case operator === "+" ||
                    operator === "*" ||
                    operator === "-" ||
                    operator === "/":
                    for (let i = 0; i < possibilities.length; i++) {
                        sides = dp_val.slice(0, -1).split(possibilities[i]);

                        helper = possibilities[i];

                        left = +sides[0];
                        right = +sides[1];

                        if (!isNaN(left || right)) {
                            break;
                        }
                    }

                    sides.length === 2
                        ? (display_panel.textContent = `${operate(
                              helper,
                              left,
                              right
                          )}${operator}`)
                        : (right = right);

                    break;

                case operator === "=":
                    for (let i = 0; i < dp_val.length; i++) {
                        let current_char = dp_val.charAt(i);

                        isNaN(+current_char) ? (opr = current_char) : (i = i);
                    }

                    sides = display_value.split(opr);
                    left = +sides[0];
                    right = +sides[1];

                    display_panel.textContent = operate(opr, left, right);
                    break;
            }
        })
    );

    let clear_btn = document.querySelector(".clr");
    clear_btn.addEventListener("click", () => (display_panel.textContent = ""));
}

function pop_display(e, display_panel) {
    if (!(e.target.textContent === "Clear" || e.target.textContent === "=")) {
        dp_ctt += e.target.textContent;
        display_panel.textContent += e.target.textContent;
    }
}

function ret_var(variable) {
    return variable;
}

function main() {
    let display_panel = document.querySelector(".panel");
    manage_btns(display_panel);

    // display_panel.addEventListener("DOMNodeInserted", (e) => {
    //     display_value += dp_ctt;
    // });
}

main();
