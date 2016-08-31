// Configuration variable

const BASIC_URL = 'http://vulgardetector-api.ttarnawski.usermd.net';

var vm_report;
var vm_report_content;
var vm_checked;
var vm_training_data;
var vm_grime;
var vm_efficiency;

$(document).ready(function () {
    vm_report = $("#report");
    vm_report_content = $("#report-content");
    vm_checked = $("#status-checked");
    vm_training_data = $("#status-training_data");
    vm_efficiency = $("#status-efficiency");
    vm_text = $("#text");
    vm_report.hide();
    fetchData();
});

function fetchData() {
    $.getJSON(BASIC_URL+'/status', function (data) {
        vm_checked.html(data.checked);
        vm_training_data.html(data.training_data);
        vm_efficiency.html(data.efficiency+'%');
    });
}

function check() {
    var data;
    var textValue = vm_text.val();

    if(textValue.length == 0 || textValue.length > 255) {
        return false;
    }

    data = {
        text: textValue,
        output: "complex"
    };

    $.post( BASIC_URL+'/check', JSON.stringify(data))
        .done(function( response ) {
            $("#form").hide();
            vm_report_content.html('<strong>TEXT: </strong>"' + response.text + '" <br> ' +
                '<strong>PROBABILITY: </strong>' + response.probability + ' <br> ' +
                '<strong>THRESHOLD: </strong>' + response.threshold + ' <br> ' +
                '<strong>STATUS: </strong>' + response.status + ' <br> '
            );

            vm_report.show();
            console.log(response);
        })
        .fail(function( response ) {
            console.log(response);
        });
}