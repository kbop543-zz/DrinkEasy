/* Set up the update user form */
function initialize (){

    // Fetch the user's current info
    $.get('/getOneUser', function(data){

        $('#email').val(data.email);
        $('#password').val(data.password);
        $('#nameOfBar').val(data.nameOfBar);
        $('#address').val(data.address);

      });
      // Set the form button on click to send an AJAX post to update
    $('#updateInfo').submit(function(event){

        event.preventDefault();

        // Get the data from form
        let formData = $('#updateInfo').serialize();

        // Send update POST AJAX
        $.post('/editUser', formData, function(data){
            console.log('Account');
            //alert('Account Updated');

            location.reload();


        })

        .fail(function(response){
            alert(response.responseText);
        });

        return false;
    });
  }

/* Set up the page */
$( document ).ready(function (){

    initialize();

})
