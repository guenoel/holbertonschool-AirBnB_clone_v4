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

    fetch("http://0.0.0.0:5100/api/v1/places_search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((places) => {
    const section = document.querySelector("section.places");
    for (const place of places) {
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${place.name}</h2>
        <p>${place.description}</p>
      `;
      section.appendChild(article);
    }
  });
  });
