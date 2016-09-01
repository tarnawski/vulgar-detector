// Configuration variable

const BASIC_URL = 'http://vulgardetector-api.ttarnawski.usermd.net';

var vm_report;
var vm_report_content;
var vm_word;
var vm_language;
var vm_text;
var vm_form;

$(document).ready(function () {
    vm_report = $("#report");
    vm_report_content = $("#report-content");
    vm_word = $("#status-word");
    vm_language = $("#status-language");
    vm_text = $("#text");
    vm_form = $("#form");
    vm_report.hide();
    fetchData();
});

function fetchData() {
    $.getJSON(BASIC_URL+'/status', function (data) {
        vm_word.html(data.words);
        vm_language.html(data.languages);
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
        text: textValue
    };

    $.post( BASIC_URL, JSON.stringify(data))
        .done(function( response ) {
            vm_form.hide();
            if (response.STATUS == 'DECENT') {
                vm_report.html('<div class="alert alert-success">Not found vulgar language</div>');
            }
            if (response.STATUS == 'VULGAR') {
                vm_report.html('<div class="alert alert-danger">Found vulgar language</div>');
            }
            vm_report.show();
        })
        .fail(function( response ) {
            console.log(response);
        });
}