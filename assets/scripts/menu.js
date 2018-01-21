/*function parseMenu() {

	$.ajax({
        type: "POST",
        dataType: 'json',
        url: "/parseMenu"
    })
    .done(function( data ) {
    	console.log(data);
    	var drinks = data.drinks;

    	for( let i in drinks){
    		let drink = drinks[i];
	    	$("#menuContainer").append(
	    		'<ul>'
	    		+ '<li> "Name: "' + drink.name + '</li>' +
	    		'<li>' + "Description: " + drink.description + "</li>" +
	    		"<li>" + "Price: " + drink.price + "</li>"
	    		 + "</ul>"
	                      );
	    }
    })
}
*/
/* Set up the page
$(document).ready(function() {
    parseMenu();
});**/
