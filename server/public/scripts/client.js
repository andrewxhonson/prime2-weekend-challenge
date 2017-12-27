$(document).ready(start);

function start() {
    console.log('JQ ready');

    listenForX();
    $('.operation').on('click', updateOperation);
    $('#equals').on('click', calculate);
    $('#clear').on('click', clear);
    getResults();

    $('#history').on('click', 'li', recalculate);
}

function updateOperation() {
    let operationName = $(this).attr('id');
    let operation;
    if (operationName === 'add') {
        operation = "+";
    } else if (operationName === 'subtract') {
        operation = "-";
    } else if (operationName === 'multiply') {
        operation = "*";
    } else {
        operation = "/";
    }
    $('#valueOperation').val(operation);
    listenForY();
}

function addValueToX() {
    let inputValue = $('#valueX').val();
    let thisButtonValue = $(this).attr('id');
    $('#valueX').val(inputValue + thisButtonValue);
}
function addValueToY() {
    let inputValue = $('#valueY').val();
    let thisButtonValue = $(this).attr('id');
    $('#valueY').val(inputValue + thisButtonValue);
}

function listenForX() {
    $('#numbers button').off('click', addValueToX);
    $('#numbers button').off('click', addValueToY);
    $('#numbers button').on('click', addValueToX);
}
function listenForY() {
    $('#numbers button').off('click', addValueToX);
    $('#numbers button').off('click', addValueToY);
    $('#numbers button').on('click', addValueToY);
}

function recalculate() {
    let data = $(this).data();
    sendCalculation(data.x, data.y, data.operation);
}

function sendCalculation(x, y, operation) {
    listenForX();
    $('#valueX').val('');
    $('#valueY').val('');
    $('#valueOperation').val('');
    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: {
            x: x,
            y: y,
            operation: operation
        },
        success: function(response) {
            console.log('post success:', response);
            getResults();

        },
        error: function(response) {
            console.log('post error:', response);
        }
    });
}

function calculate() {
    let x = $('#valueX').val();
    let y = $('#valueY').val();
    let operationName = $(this).attr('id');
    let operation;
    if (operationName === 'add') {
        operation = "+";
    } else if (operationName === 'subtract') {
        operation = "-";
    } else if (operationName === 'multiply') {
        operation = "*";
    } else {
        operation = "/";
    }

    if (x !== "" && y !== "") {
        sendCalculation(x, y, operation);
    } else {
        alert('Both numbers must be filled in!');
    }
}

function clear() {
    $.ajax({
        url: '/clear',
        method: 'DELETE',
        data: {},
        success: function(response) {
            console.log('delete success:', response);
            getResults();

        },
        error: function(response) {
            console.log('delete error:', response);
        }
    });
}

function display(results) {
    let resultsList = $('<ul id="resultsList"></ul>');
    let resultsDiv = $('#history');
    
    for (let i = 0; i < results.length; i++) {
        let newListItem = $('<li>' + results[i].x + " " + results[i].operation + " " + results[i].y + " = " + results[i].result + '</li>');
        newListItem.data(results[i]);
        resultsList.append(newListItem);
    }

    resultsDiv.empty();
    resultsDiv.append(resultsList);
}

function getResults() {
    $.ajax({
        url: '/calculate',
        method: 'GET',
        success: function(response) {
            console.log('get success:', response);
            display(response);
        },
        error: function(response) {
            console.log('get error:', response);
        }
    })
}