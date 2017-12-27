function calculate(x, y, operation) {
    if (operation === '+') {
        x = Number(x);
        y = Number(y);
        return x + y;
    } else if (operation === '-') {
        return x - y;
    } else if (operation === '*') {
        return x * y;
    } else {
        return x / y;
    }
}

module.exports = calculate;