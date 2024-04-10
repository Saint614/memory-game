// Function to perform a place search based on the user's input
function searchPlaces(input) {
  // Initialize a PlacesService object
  const placesService = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  // Define the request parameters for the place search
  const request = {
    query: input,
    fields: ["name", "geometry"],
  };

  // Perform the place search
  placesService.findPlaceFromQuery(request, (results, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      results &&
      results.length
    ) {
      const location = results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
      });

      // create a marker for each place found and display it on the map
      results.forEach((place) => {
        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });
      });
    } else {
      // handle errors or no results found
      console.error("Error fetching search results:", status);
      document.getElementById("search-results").innerHTML = "No results found.";
    }
  });
}
// When the page loads, perform a place search based on the query parameter in the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  if (query) {
    searchPlaces(query);
  }
};
// Function to display the search results in the HTML page
function displaySearchResults(results) {
  const container = document.getElementById("search-results");

  // Clear previous search results
  container.innerHTML = "";

  // Display each search result
  results.forEach((place) => {
    const name = place.name;
    const address = place.formatted_address;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    // Create HTML elements to display the search result
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${address}</p>
            <p>Latitude: ${latitude}, Longitude: ${longitude}</p>
            <hr>
        `;
    container.appendChild(resultDiv);
  });
}

// When the page loads, perform a place search based on the query parameter in the URL
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  if (query) {
    searchPlaces(query);
  }
};
