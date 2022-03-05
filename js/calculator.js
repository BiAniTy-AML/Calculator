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
