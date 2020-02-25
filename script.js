const apiKey = "6bd2892ddab2e2361c20e0ea6bbd659c";
const cityId = 282; //Las Vegas
const cuisineId = 25; //Breakfast
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
    apiData.restaurants.forEach(item => {


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
  let hasHomeDelivery = [];

  maindata.restaurants.forEach(item => {
    if (item.restaurant.has_online_delivery !== 0) {
      hasHomeDelivery.push(item)
    }
  })

  return hasHomeDelivery
};


const filterTableBooking = (maindata) => {
  let hasTableBooking = [];

  maindata.restaurants.forEach(item => {
    if (item.restaurant.has_table_booking !== 0) {
      hasTableBooking.push(item)
    }

  })

  return hasTableBooking
};
