

var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response.data);         
    });

