// $(document).ready(function() {
//     console.log("ready");
var queryURL = "http://www.astropical.space/astrodb/api-ephem.php?lat=35&lon=139?q=latitude";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      
   
    var createRow = function(data){

    // //show reference to existing tbody element, create a new table row element
    var tBody =$("tbody");
    var tRow =$("<tr>");

    // // //methods run on jquery selectors 

      var planetNameTd = $("<td>").text(response.data.name);
      var constellationNameTd = $("<td>").text(response.data.const);
      var distance = $("<td>").text(response.data.au_earth);

    // // //Append the created table data to the table
     tRow.append(planetNameTd, constellationNameTd, distance);
    // // //Append the table row to the table body
     tBody.append(tRow);
    }
  
});