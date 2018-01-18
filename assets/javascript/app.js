
  var giphy_key = "MMMz06Y0heyrk39RaVPpk2qWqdxaBsNS";
  var topicsArray = [ "dinosaur", "jellyfish", "giraffe",
      "dogs","cats","birds","elephant","fish",
      "tiger","shark"];
  //var maxWidth = 490;

  var maxWidth = $("#imagesHeader").width();
  console.log("maxWidth "+maxWidth);

  for ( var i=0; i < topicsArray.length; i++)
   {
       var newButton = $("<button>");
       newButton.attr("id","button-"+i);
       newButton.text(topicsArray[i]);
       $(newButton).addClass("gif");
       $(newButton).addClass("btn"); //bootstrap
       $(newButton).addClass("btn-default");
       $("#buttonSection").append(newButton);
   }
    // Capture Button Click
    $("#add-topic").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      var addedTopic = $("#topic-input").val().trim();
      console.log("topic input "+addedTopic);

      queryTopic(addedTopic);
      
      // does not work???? $("#input-form").reset();
      document.getElementById("input-form").reset();
      maxWidth = $("#imagesHeader").width();
      console.log("new maxWidth "+maxWidth);
    });

    //The event is tied to "body", a tag which always exists and contains all the .gif elements that should be acted on
    //The .gifs are the elements that will actually activate the event, and $(this) will point to the individual gifs, not the body
    $("body").on("click", ".gif", function() {
      console.log("A gif was clicked!")
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
 
 function queryTopic( newTopic) {
  
  console.log("newTopic "+newTopic) ; 

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+giphy_key+"&q=funny+"+newTopic+"&limit=10";

 console.log("queryURL "+queryURL);

console.log("query "+queryURL);

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .then(function(response) {
console.log(response);

      $("#imagesSection").empty();

      for ( j=0; j < 10; j++ )
      {
      // search key

      // still photo
      var imageStillUrl = response.data[j].images.original_still.url;
      // original animated
      var imageUrl = response.data[j].images.original.url;
      // image Rating
      var imageRating = response.data[j].rating;

      var imageTitle = response.data[j].title;
      
      var imageHeight = response.data[j].images.original_still.height;
      var imageWidth = response.data[j].images.original_still.width;
console.log("imageUrl "+imageUrl);
console.log("title "+imageTitle);
//console.log("height "+imageHeight);
console.log("width "+imageWidth + " height "+imageHeight);
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
        console.log("percent is "+percent);
        // increase or decrease to stay inside form
        newImage.attr("height",imageHeight*percent);
        newImage.attr("width",imageWidth*percent);
       // newImage.addClass("img-responsive");

        newPar.addClass("image-par");
        newPar.prepend(newImage);
       // var newCaption = $("<figcaption>");
       // newCaption.text("Rating "+imageRating);

       // newImage.append(newCaption);
        // Prepending the newImage to the images div
        $("#imagesSection").prepend(newPar);
      //  $("#images").append(newCaption);
      } // end for  
  });
 }
//var mytest="mystery pic";
//queryTopic(mytest);

    // Event listener for our button
$("button").on("click", function() {
    // queryURL for Giphy API
    var res = $(this).attr("id").split("-");
    var buttonNumber = res[1];
    var buttonTopic = topicsArray[buttonNumber];

    console.log("buttonTopic "+buttonTopic);
   console.log("buttonNumber "+buttonNumber);

   queryTopic(buttonTopic);

      maxWidth = $("#imagesHeader").width();
      console.log("new2 maxWidth "+maxWidth);
});

