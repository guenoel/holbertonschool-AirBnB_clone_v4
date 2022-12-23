#!/usr/bin/node
//const $ = window.$; pour faire plaisir a semistandard
$(document).ready(function () {
    // Create a variable to store the Amenity IDs
    const amenities = {};
  
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
      // Get the Amenity ID
      const amenityId = $(this).attr('data-id');
  
      // Check if the checkbox is checked
      if ($(this).is(':checked')) {
        // Add the Amenity ID to the amenities variable
        amenities[amenityId] = true;
      } else {
        // Remove the Amenity ID from the amenities variable
        delete amenities[amenityId];
      }
  
      // Update the h4 tag with the list of Amenities checked
      updateAmenitiesh4(amenities);
    });
  
    function updateAmenitiesh4 (amenities) {
      // Get the h4 tag
      const amenitiesTag = $('div.amenities h4');
  
      // Clear the contents of the h4 tag
      amenitiesTag.empty();
  
      // Iterate through the amenities variable
      for (const amenityId in amenities) {
        // Get the Amenity name
        const amenityName = $('input[data-id="' + amenityId + '"]').attr('data-name');
  
        // Append the Amenity name to the h4 tag
        amenitiesTag.append(amenityName + '\n');
      }
    }

    $.get("http://0.0.0.0:5100/api/v1/status/", function (response) {
      if (response.status === "OK") {
      $('div#api_status').addClass("available");
      }
      else {
        $('div#api_status').removeClass("available");
      }
    });

// Listen for clicks on the button tag
$('button').click(function () {
    fetch("http://0.0.0.0:5100/api/v1/places_search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  //Target the right places with amenities selected
  body: JSON.stringify({ amenities: Object.keys(amenities) })
})
  .then((response) => response.json())
  .then((places) => {
    // Clear the contents of the section.places element
    $('section.places').empty();
    const section = document.querySelector("section.places");
    for (const place of places) {
      const article = document.createElement("article");
      article.innerHTML = `
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}$</div>
        </div>
        <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Room${place.number_rooms > 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
        </div>
        <div class="description">
              ${place.description}
        </div>
      
      `;
      section.appendChild(article);
    }

  });
});
  // ready closure
  });
