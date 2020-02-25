const apiKey = "6bd2892ddab2e2361c20e0ea6bbd659c";
const cityId = 282; //Las Vegas
const cuisineId = 182; //Breakfast
//https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}
let maindata = ""
let activate = ""

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
      //console.log(item.restaurant.name);
      //console.log(item.restaurant.user_rating.aggregate_rating);
      //console.log(item.restaurant.user_rating.rating_text);
      //console.log(item.restaurant.highlights[0]);
      //console.log(item.restaurant.average_cost_for_two);
      //console.log(item.restaurant.location.address);

      //console.log(item.restaurant.photos[0].photo.thumb_url);


      container.innerHTML += `<p><span class="resLabel">Restaurant:</span> ${
        item.restaurant.name
        }. <br/><span class="resLabel">Rating:</span> ${
        item.restaurant.user_rating.aggregate_rating
        }. ${
        item.restaurant.user_rating.rating_text
        }. <br/><span class="resLabel">Info:</span> ${
        item.restaurant.highlights[0]
        }. <br/><span class="resLabel">Snittkostnad (2 pers):</span> ${
        item.restaurant.average_cost_for_two
        }.<br/><span class="resLabel">Address:</span> ${
        item.restaurant.location.address
        }. <img src="${item.restaurant.thumb}"/></p>`;

    }
    );
  });

const container = document.getElementById("resContainer");



document.getElementById("deliveryDropdown").addEventListener("change", () => revealFilter(deliveryDropdown.value));

revealFilter = (value) => {

  if (value === "Homedelivery") {
    filterDelivery(maindata);
  }

  else if (value === "Online-booking") {
    filterTableBooking(maindata);
  };

};

const filterDelivery = (maindata) => {
  let hasHomeDelivery = {};
  hasHomeDelivery = maindata.restaurants.filter(resto => resto.restaurant.has_online_delivery !== "0");
  console.log(hasHomeDelivery);

  //activate = hasHomeDelivery;

  //showNewList()

};

const filterTableBooking = (maindata) => {
  let hasTableBooking = {};
  hasTableBooking = maindata.restaurants.filter(resto => resto.restaurant.has_table_booking !== "0");
  console.log(hasTableBooking);

  hasTableBooking.forEach((restaurant) => {
    console.log(restaurant)
    container.innerHTML = "";
    container.innerHTML +=
      `<p><span class="resLabel">Restaurant:</span>
      ${restaurant.name}. <br/><span class="resLabel">Rating:</span> ${restaurant.user_rating.aggregate_rating}.
       ${restaurant.user_rating.rating_text}. <br/><span class="resLabel">Info:</span>
       ${restaurant.highlights[0]}. <br/><span class="resLabel">Snittkostnad (2 pers):</span>
       ${restaurant.average_cost_for_two}.<br/><span class="resLabel">Address:</span>
       ${restaurant.location.address}. <img src="${restaurant.thumb}"/></p>`;

  });


  //activate = hasTableBooking;

  //showNewList()
}


/*const showNewList = (activate) => {

  activate.forEach((restaurant) => {
    console.log(restaurant)
    container.innerHTML = "";
    container.innerHTML +=
      `<p><span class="resLabel">Restaurant:</span>
      ${restaurant.name}. <br/><span class="resLabel">Rating:</span> ${restaurant.user_rating.aggregate_rating}.
       ${restaurant.user_rating.rating_text}. <br/><span class="resLabel">Info:</span>
       ${restaurant.highlights[0]}. <br/><span class="resLabel">Snittkostnad (2 pers):</span>
       ${restaurant.average_cost_for_two}.<br/><span class="resLabel">Address:</span>
       ${restaurant.location.address}. <img src="${restaurant.thumb}"/></p>`;

  });

}; */
