function signupSetup() {

    /* Set on-click to slide open the sign up form */
    $('#signupButton').click(function() {
        $('#signup').slideToggle('slow');
    });
}

/* Set up the page */
$(document).ready(function() {
    signupSetup();
});