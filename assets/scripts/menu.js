function parseMenu() {

	$.ajax({
        type: "POST",
        dataType: 'json',
        url: "/parseMenu"
    })
    .done(function( data ) {
    	$(.menu).append('<ul <li>' +
                      "Name of Bar: " + data + "</li>" 
                      /*+ "<li>" +
                      "Name: " + allMarkables[j][1] + "</li><li>" +
                      "Description: " + allMarkables[j][5] + "</li><li>" +
                      "Weight: " + allMarkables[j][2] + "</li><li>" +
                      "Due Date: " + markableDate.toString().substr(0, markableDate.toString().length - 18) + "</li><li ><b>"+
                      "Recommended Start Date: " + getReccomendedStartDate(allMarkables[j][2],markdate) +"</b></li>" +
                      '<input id="'+allMarkables[j][1].trim()+'" class="deleteMarkableButton" type="button" value="Delete a markable" '+
                      'onClick="deleteMarkable(\'' + allMarkables[j][0].trim() + '\', \'' + allMarkables[j][1] + '\')"' */
                        //+  '</li><li>'
                        + "</ul><b>"
                      );
    })
}

/* Set up the page */
$(document).ready(function() {
    parseMenu();
});