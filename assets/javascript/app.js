//--------------------------------------------------------
// GLOBAL VARIABLES
//--------------------------------------------------------

  var giphy_key = "MMMz06Y0heyrk39RaVPpk2qWqdxaBsNS";
  var topicsArray = [ "dinosaur", "jellyfish", "giraffe",
      "dogs","cats","birds","elephant","fish",
      "rabbit","shark"];
  var addedTopic = "";
  var maxWidth = $("#imagesHeader").width();

  // CREATE TOPIC BUTTONS
  for ( var i=0; i < topicsArray.length; i++)
   {
      var newButton = $("<button>");
      newButton.attr("id","button-"+i);
      newButton.text(topicsArray[i]);
      $(newButton).addClass("gif");
      $(newButton).addClass("btn"); //bootstrap
      $(newButton).addClass("btn-info");
      $(newButton).addClass("btn-topic");
      $("#buttonSection").append(newButton);
   }

//--------------------------------------------------------
// Wait for add topic button selection
// Event listener for our button
//--------------------------------------------------------
  $("#add-topic").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      addedTopic = $("#topic-input").val().trim();

      //console.log("topic input addedTopic "+addedTopic);

      queryTopic(addedTopic);
      
      document.getElementById("input-form").reset();
      maxWidth = $("#imagesHeader").width();

      if (addedTopic !== "")
        $("#imagesHeader").text("FUNNY "+addedTopic+" IMAGES");
      else
        $("#imagesHeader").text("FUNNY IMAGES");
       

  });

//--------------------------------------------------------
// Wait for click on one of the gif images
// then toggle still and animate states
// The event is tied to "body", a tag which always exists and contains all the .gif elements that should be acted on
// The .gifs are the elements that will actually activate the event, and $(this) will point to the individual gifs, not the body
//--------------------------------------------------------
  $("body").on("click", ".gif", function() {
    //event.preventDefault();
     // event.stopPropagation();
    //console.log("A gif was clicked!");

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
      
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") 
      {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
    else 
      {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  }); // end gif click
 
 //--------------------------------------------------------
 // queryTopic
 // retrieve data on topic
 //--------------------------------------------------------
 function queryTopic( newTopic ) 
  {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+giphy_key+"&q=funny+"+newTopic+"&limit=10";

    //console.log("queryURL "+queryURL);

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response) {
      //console.log(response);

      $("#imagesSection").empty();

      for ( j=0; j < 10; j++ )
      {

        // still photo
        var imageStillUrl = response.data[j].images.original_still.url;
        // original animated
        var imageUrl = response.data[j].images.original.url;
        // image Rating
        var imageRating = response.data[j].rating;
        var imageTitle = response.data[j].title;
        var imageHeight = response.data[j].images.original_still.height;
        var imageWidth = response.data[j].images.original_still.width;

        //console.log("title "+imageTitle);

        // Creating and storing paragraph tag
        var newPar = $("<p>");

        // Creating and storing an image tag
        var newImage = $("<img>");

        // add style
        newPar.html("<br>"+imageTitle+"<br>Rating "+imageRating+"<br><br>");
        newPar.attr("style","text-align:center");

        // Setting the newImage src attribute to imageUrl
        newImage.attr("src", imageStillUrl);
        newImage.attr("alt", "new image");

        // add class gif
        newImage.addClass("gif");

        // add still and animate attributes
        newImage.attr("data-still", imageStillUrl);
        newImage.attr("data-animate", imageUrl);
        newImage.attr("data-state", "still")

        newImage.attr("rating",imageRating);

        var percent = (maxWidth-20)/imageWidth; 

        // increase or decrease size to stay inside form
        newImage.attr("height",imageHeight*percent);
        newImage.attr("width",imageWidth*percent);
        newPar.addClass("image-par");
        newPar.prepend(newImage);

        // Prepending the newImage to the images div
        $("#imagesSection").prepend(newPar);

      } // end for  

  });
 } // end queryTopic

//--------------------------------------------------------
// Wait for topic button selection
// Event listener for our button
//--------------------------------------------------------
 $(".btn-topic").on("click", function() {
 //   event.preventDefault();
    
    // queryURL for Giphy API
    var res = $(this).attr("id").split("-");
    var buttonNumber = res[1];
    var buttonTopic = topicsArray[buttonNumber];

    //console.log("buttonTopic "+buttonTopic);

    if ( buttonNumber == 'topic')
      console.log("what???")
    else
     {
       queryTopic(buttonTopic);
       $("#imagesHeader").text("FUNNY "+buttonTopic+" IMAGES");
     }
    maxWidth = $("#imagesHeader").width();

});
