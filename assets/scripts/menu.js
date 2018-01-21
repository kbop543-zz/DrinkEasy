function parseMenu() {

	$.ajax({
        type: "POST",
        dataType: 'json',
        url: "/parseMenu"
    })
    .done();
}

/* Set up the page */
$(document).ready(function() {
    parseMenu();
});