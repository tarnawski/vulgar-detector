// Configuration variable

const BASIC_URL = 'http://vulgardetector-api.ttarnawski.usermd.net';

var vm_report;
var vm_report_content;
var vm_word;
var vm_language;
var vm_requests;
var vm_requests_today;
var vm_text;
var vm_form;

$(document).ready(function () {
    vm_report = $("#report");
    vm_report_content = $("#report-content");
    vm_word = $("#status-word");
    vm_requests = $("#status-requests");
    vm_requests_today = $("#status-requests-today");
    vm_language = $("#status-language");
    vm_text = $("#text");
    vm_form = $("#form");
    vm_report.hide();
    fetchData();

    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');

        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });

    $('ul.setup-panel li.active a').trigger('click');
});

function fetchData() {
    $.getJSON(BASIC_URL + '/status', function (data) {
        vm_word.html(data.words);
        vm_language.html(data.languages);
        vm_requests.html(data.requests);
        vm_requests_today.html(data.requests_today);
    });
}

function check() {
    var data;
    var textValue = vm_text.val();

    if (textValue.length == 0 || textValue.length > 512) {
        vm_report.html('<div class="alert alert-danger">The length of the text is incorrect.</div>');
        vm_report.show();

        return false;
    }

    data = {
        text: textValue
    };

    $.post(BASIC_URL, JSON.stringify(data))
        .done(function (response) {
            if (response.STATUS == 'DECENT') {
                vm_report.html('<div class="alert alert-success"><strong>Vulgar</strong>Detector not found any vulgar language in the following text</div>');
            }
            if (response.STATUS == 'VULGAR') {
                vm_report.html('<div class="alert alert-danger"><strong>Vulgar</strong>Detector found vulgar language in the following text</div>');
            }
            vm_report.show();
        })
        .fail(function (response) {
            console.log(response);
        });
}