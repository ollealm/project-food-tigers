const apiKey = "6bd2892ddab2e2361c20e0ea6bbd659c";
const cityId = 282; //Las Vegas
const cuisineId = 182; //Breakfast
//https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}
let maindata = ""

fetch(
  `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&cuisines=${cuisineId}`, {
  headers: {
    "user-key": apiKey
  }
}
)
  .then(response => {
    return response.json();
  })
  .then(apiData => {
    console.log("API response:", apiData);

    maindata = apiData

    //json.restaurants.forEach(item => {
    //console.log(item.restaurant.name);
    //});

    apiData.restaurants.forEach(item => {

      const resContainer = document.getElementById("resContainer")

      resContainer.innerHTML += `
        <article class="container-restaurant">
        <div class="image">
        <img src="${item.restaurant.thumb}"/></div>
        <div class="text"><h3> ${item.restaurant.name} </h3>
        <p> <br/><span class="resLabel">Rating:</span> ${
        item.restaurant.user_rating.aggregate_rating} ${
        item.restaurant.user_rating.rating_text}
        <br/><span class="resLabel">Average cost (2 pers):</span> ${
        item.restaurant.average_cost_for_two
        }<br/><span class="resLabel">Address:</span> ${
        item.restaurant.location.address
        } </p></div>
        </article>`
    });
  });