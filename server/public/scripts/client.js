$(document).ready(start);

function start() {
    console.log('JQ ready');

    $('.operation').on('click', calculate);
    $('#clear').on('click', clear);
    getResults();
}

function calculate() {
    let x = $('#valueX').val();
    let y = $('#valueY').val();
    let operation = $(this).attr('id');

    if (x !== "" && y !== "") {
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
                console.log('get error:', response);
            }
        });
    } else {
        alert('Both numbers must be filled in!');
    }
}

function clear() {
    $.ajax({
        url: '/clear',
        method: 'POST',
        data: {},
        success: function(response) {
            console.log('post success:', response);
            getResults();

        },
        error: function(response) {
            console.log('get error:', response);
        }
    });
}

function display(results) {
    let resultsList = $('<ul id="resultsList"></ul>');
    let resultsDiv = $('#history');
    
    for (let i = 0; i < results.length; i++) {
        resultsList.append('<li>' + results[i] + '</li>');
    }
console.log(resultsList);
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