// Variable to hold request
var request;

// Bind to the submit event of our form
$("#miles").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        // url: "https://script.google.com/macros/s/AKfycbwzJmm6HwkWvi0uXRxl9deJ8z6pJbIGeAWr6YQGgstbQ17hM49N/exec",
        url: "https://script.google.com/macros/s/AKfycbwzJmm6HwkWvi0uXRxl9deJ8z6pJbIGeAWr6YQGgstbQ17hM49N/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });


    $('.dropbtn').val();
    $('.milesInput').val();
    var dropbtn = document.getElementById('name');
    dropbtn.value = '';
    var milesInput = document.getElementById('milesRan');
    milesInput.value = '';

    clearMileName();

    // Prevent default posting of form
    event.preventDefault();
});

function clearMileName() {
    $('.milesInput').attr('name', "name");
    $('.submitBtn').hide();
    $('.thanks').show();   
    
    setTimeout(function(){getTotals();}, 1000);
}





// GET TOTAL MILES RAN FROM SHEET ==================================

window.onload = function() {
  $('.total-submit').click();
  $('.runners-total-submit').click();
};

function getTotals() {
  $('.total-submit').click();
  $('.runners-total-submit').click();
};

//Prevent Default Form Behavior (don't want the form submit to re-load the page)
$(document).ready(function() {
  $('#totals').submit(function(evt) {
    evt.preventDefault();
  });
});

var googleSheetKey = "1jsaOqUEUFo6Y5wSVvn0JGY57nlpcp_KzCjK2nF9AwH0";
var theSheet;//Save the preloaded JSON object here

//pre-load the sheet on page load
$.ajax({
  url: 'https://spreadsheets.google.com/feeds/list/' + googleSheetKey + '/o4yaqwc/public/values?alt=json-in-script',
  dataType: 'jsonp',
  success: function(dataWeGotViaJsonp) {
    theSheet = dataWeGotViaJsonp;
  }
});


function populatePage() {
  var totalMiles = "";
  theSheet.feed.entry.forEach(
    function(row) {
      totalMiles = row.gsx$total.$t;   
    }
  );
  $('#totalMiles').html(totalMiles);
  return false;
}



// ==============

//Prevent Default Form Behavior (don't want the form submit to re-load the page)
$(document).ready(function() {
  $('#runners-totals').submit(function(evt) {
    evt.preventDefault();
  });
});

var SheetKey = "1jsaOqUEUFo6Y5wSVvn0JGY57nlpcp_KzCjK2nF9AwH0";
var theSheet2;//Save the preloaded JSON object here

//pre-load the sheet on page load
$.ajax({
  url: 'https://spreadsheets.google.com/feeds/list/' + SheetKey + '/o4gp47q/public/values?alt=json-in-script',
  dataType: 'jsonp',
  success: function(dataWeGotViaJsonp) {
    theSheet2 = dataWeGotViaJsonp;
  }
});
  
  


function populateTable() {
  table = "";
  theSheet2.feed.entry.forEach(
    function(row) {
      tableRow = "<tr>";
      tableRow += "<td>" + row.gsx$name.$t + "</td>";
      tableRow += "<td>" + row.gsx$total.$t + "</td>";
      tableRow += "</tr>";
      table += tableRow;
    }
  );
  $('#individual-miles').html("<tbody id='runner-list'><tr><th>runner</th><th>miles</th></tr>" + table + "</tbody>");
  return false;
}










