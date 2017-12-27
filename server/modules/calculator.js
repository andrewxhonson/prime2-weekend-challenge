function calculate(x, y, operation) {
    if (operation === 'add') {
        x = Number(x);
        y = Number(y);
        return x + y;
    } else if (operation === 'subtract') {
        return x - y;
    } else if (operation === 'multiply') {
        return x * y;
    } else {
        return x / y;
    }
}

module.exports = calculate;