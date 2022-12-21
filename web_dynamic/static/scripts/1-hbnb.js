#!/usr/bin/node
$(document).ready(function() {
    // Create a variable to store the Amenity IDs
    var amenities = {};
  
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
      // Get the Amenity ID
      var amenityId = $(this).attr('data-id');
  
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
  
    function updateAmenitiesh4(amenities) {
      // Get the h4 tag
      var amenitiesTag = $('div.amenities h4');
  
      // Clear the contents of the h4 tag
      amenitiesTag.empty();
  
      // Iterate through the amenities variable
      for (var amenityId in amenities) {
        // Get the Amenity name
        var amenityName = $('input[data-id="' + amenityId + '"]').attr('data-name');
  
        // Append the Amenity name to the h4 tag
        amenitiesTag.append(amenityName + '\n');
      }
    }
  });