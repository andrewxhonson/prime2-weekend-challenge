$(document).ready(start);

function start() {
    console.log('JQ ready');

    $('.operation').on('click', calculate);
    $('#clear').on('click', clear);

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
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        });
    } else {
        alert('Both numbers must be filled in!');
    }
}

function clear() {

}