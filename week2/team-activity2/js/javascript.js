/ number 2
function checkValue() {
    isNum = document.getElementById('number').value;
    if (isNaN(isNum)) {
        document.getElementById('warning').style.visibility = 'visible';
        return false;
    } else {
        document.getElementById('warning').style.visibility = 'hidden';
        return true;
    }
}
//  number 1, 3
function sum(number) {
    // debugger;
    if (checkValue) {
        let total = number;
        for (let i = 0; i < number; i++) {
            total += i;
        }
        document.getElementById('result1').innerHTML = total;
    } else {
        document.getElementById('warning').style.visibility = 'visible';
    }
}
// stretch
function add(x, y) {
    document.getElementById('result2').innerHTML = x + y;
}
const subtraction = (x, y) => {
    document.getElementById('result2').innerHTML = x - y
};
const multiply = function (x, y) {
    document.getElementById('result2').innerHTML = x * y
};