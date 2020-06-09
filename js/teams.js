function resultDetailTimJSON(data) {
  document.getElementById("logoKlub").src = data.crestUrl;
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("founded").innerHTML = data.founded;
  document.getElementById("website").innerHTML = data.website;
  document.getElementById("venue").innerHTML = data.venue;
}