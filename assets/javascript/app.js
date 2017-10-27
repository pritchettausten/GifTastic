$(document).ready(function() {

	var topics = ["Spongebob", "Rocket Power", "Courage The Cowardly Dog", "Ed Edd n Eddy", "Rugrats", "Wild Thornberrys", "Doug", "Hey Arnold", "Dexter's Laboratory", "Johnny Bravo", "Pokemon Indigo League", "Magic School Bus"];


	function displayGiphy () {

 

		var show = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response); 
        		
        	$(".gifImages").empty();

        	var gifData = response.data
        	
        	for (var j = 0; j < 10; j++) {

	        	var imgURL = gifData[j].images.fixed_height.url;
	        	var stillImage = gifData[j].images.fixed_height_still.url;

	        	var div = $("<div>");
	        		div.addClass("gifDiv");

	        	var p = $("<h4>").text("Rating: " + gifData[j].rating);
	        		div.append(p);

	        	var gif = $("<img>").attr("src", stillImage);
	        		gif.attr("frameBorder", 0);
	        		gif.attr("data-animate", imgURL);
	        		gif.attr("data-still", stillImage);
	        		gif.attr("data-state", "still")
	        		gif.addClass("giphy");
	        		div.append(gif);
	        	
	        	$(".gifImages").append(div);

        	};
		    $(".giphy").on("click", function() {
		    
		    	var state = $(this).attr("data-state");

		        if (state === "still") {
		          var url = $(this).attr("data-animate");
		          $(this).attr("src", url);
		          state = $(this).attr("data-state", "animate");
		        }  
		        else if (state === "animate") {
		          var url = $(this).attr("data-still");
		          $(this).attr("src", url);
		          state = $(this).attr("data-state", "still");
		        };
		    });
        });
        console.log(queryURL);
	};

	function createButtons () {
		$(".btn-group").empty();
		for (var i = 0; i < topics.length; i++) {
			var b = $("<button type='button'>");
	            b.addClass("btn-success series");
	            b.attr("data-name", topics[i].toLowerCase());
	            b.text(topics[i]);

				$(".btn-group").append(b);

			
		};
	};
	$("#add-tv").on("click", function(event) {
        event.preventDefault();
       
        var tvShow = $("#tv-input").val().trim();

        topics.push(tvShow);

        createButtons();
    });

	// $(document.body).on("click", "img", function() {
	// 	alert("hey");
	// });
	
	$(document).on("click", ".series", displayGiphy);
	createButtons();
});

