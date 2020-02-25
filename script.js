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

    // Create variable for restaurant array
    const restaurants = maindata.restaurants

    // Function for sorting list after price
    const sortCost = (selected) => {
      if (selected === "low") {
        restaurants.sort((a, b) => a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two)
        console.log('if low', restaurants.restaurant.average_cost_for_two)
      } else if (selected === "high") {
        restaurants.sort((a, b) => b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two)
        console.log('if high', restaurants.restaurant.average_cost_for_two)
      }
    }

    document.getElementById('sortPrice').addEventListener("change", () => sortCost(sortPrice.value))


    restaurants.forEach(item => {


      const container = document.getElementById("resContainer");

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
    });
  });