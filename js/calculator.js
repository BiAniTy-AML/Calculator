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
    let expression_sides = [];
    let dp_val = "";
    let left_side = "0";
    let right_side = "";
    let opr = "";

    equals_btn.forEach((button) =>
        button.addEventListener("click", (e) => {
            let display_value = display_panel.textContent;
            operator = e.target.textContent;

            dp_val = display_panel.textContent.slice(
                0,
                display_value.length + 1
            );

            switch (operator) {
                case "+":
                    break;

                case "=":
                    for (let i = 0; i < dp_val.length + 1; i++) {
                        let current_char = dp_val.charAt(i);

                        switch (true) {
                            case current_char === "":
                                expression_sides[1] = +right_side;

                                switch (opr) {
                                    case "+":
                                        display_panel.textContent = operate(
                                            opr,
                                            expression_sides[0],
                                            expression_sides[1]
                                        );
                                        expression_sides[0] = "";
                                        expression_sides[1] = "";
                                        left_side = "0";
                                        right_side = "";
                                        break;

                                    case "*":
                                        display_panel.textContent = operate(
                                            opr,
                                            expression_sides[0],
                                            expression_sides[1]
                                        );
                                        expression_sides[0] = "";
                                        expression_sides[1] = "";
                                        left_side = "0";
                                        right_side = "";
                                        break;

                                    default:
                                        break;
                                }
                                break;

                            case isNaN(+current_char):
                                expression_sides[0] = +left_side;
                                left_side = "";
                                opr = current_char;
                                break;

                            case !isNaN(+current_char):
                                !left_side
                                    ? (right_side += +current_char)
                                    : (left_side += current_char);
                                break;
                        }
                    }
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
