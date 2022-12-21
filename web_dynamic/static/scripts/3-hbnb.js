#!/usr/bin/node
const $ = window.$;
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
});
let API_URL = 'http://0.0.0.0:5001/api/v1/status/';
$.get(API_URL, function (data, response) {
  if (response === 'succes' && data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    ('div#api_status').removeClass('available');
  }

  API_URL = 'http://0.0.0.0:5001/api/v1/places_search/';

  // Make a POST request to the places_search endpoint with an empty body
  $.ajax({
    url: API_URL,
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      // Loop through the list of places in the response
      for (let i = 0; i < data.length; i++) {
        // Get the current place
        const place = data[i];

        // Create an article tag for the place
        const placeElement = $('<article></article>');

        // Create a div tag for the place name
        const nameElement = $('<div></div>').addClass('title');
        nameElement.text(place.name);

        // Create a div tag for the place city
        const cityElement = $('<div></div>').addClass('title');
        cityElement.text(place.city);

        // Create a div tag for the place description
        const descriptionElement = $('<div></div>').addClass('description');
        descriptionElement.text(place.description);

        // Append the name, city, and description to the article element
        placeElement.append(nameElement);
        placeElement.append(cityElement);
        placeElement.append(descriptionElement);

        // Add the article element to the places section
        $('section.places').append(placeElement);
      }
    },
    error: function (error) {
      console.error(error);
    }
  });
});
