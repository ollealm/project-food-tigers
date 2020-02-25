const apiKey = "6bd2892ddab2e2361c20e0ea6bbd659c";
const cityId = 282; //Las Vegas
const cuisineId = 182; //Breakfast
//https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}
let maindata;

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

    console.log("maindata:", maindata);

    //json.restaurants.forEach(item => {
    //console.log(item.restaurant.name);
    //});

    apiData.restaurants.forEach(item => {
      // console.log(item.restaurant.name);
      // console.log(item.restaurant.user_rating.aggregate_rating);
      // console.log(item.restaurant.user_rating.rating_text);
      // console.log(item.restaurant.highlights[0]);
      // console.log(item.restaurant.average_cost_for_two);
      // console.log(item.restaurant.location.address);

      //console.log(item.restaurant.photos[0].photo.thumb_url);

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


const filterPrice = () => {
  let priceRange = 0;

  let filteredRestaurants = [];
  let filteredCheap = [];
  let filteredMid = [];
  let filteredExpen = [];

  maindata.restaurants.forEach(item => {
    // console.log(item.restaurant.average_cost_for_two);

    const aveCost = item.restaurant.average_cost_for_two

    if (aveCost <= 10) {
      filteredCheap.push(item)
      // document.getElementById("resContainer")
      // console.log(`billigt ${aveCost} ${item.restaurant.name}`)

    } else if (aveCost <= 20) {
      // console.log("mellan", aveCost)
      filteredMid.push(item)

      //add mid-price class
    } else if (aveCost > 20) {
      // console.log("skitdyrt", aveCost)
      filteredExpen.push(item)

      //add high-price class
    } else {
      //wops try again
      filteredRestaurants.push(item)

    }

    //





  })

  if (priceDropdown.value === "cheap") {
    console.log("cheap", filteredCheap)
  } else if (priceDropdown.value === "mid") {
    console.log("mid", filteredMid)
  } else {
    console.log("exp", filteredExpen)
  }

};
document.getElementById('priceDropdown').addEventListener('change', () => filterPrice())
// document.getElementById('filterPriceButton').addEventListener('click', console.log(maindata))

// if (maindata) {

//   filterPrice(maindata);
// }

/*document.getElementById("deliveryDropdown").addEventListener("change", () => filterDelivery());
const filterDelivery = () => {
  const hasHomeDelivery = maindata.restaurants.filter(resto => resto.restaurant.has_online_delivery !== "0");
  console.log(hasHomeDelivery);
  return hasHomeDelivery;
};
const container = document.getElementById("resContainer");
filterDelivery.forEach((restaurant) => {
  console.log(restaurant)
  container.innerHTML = "";
  container.innerHTML +=
    `<p><span class="resLabel">Restaurant:</span>
        ${restaurant.name}. <br/><span class="resLabel">Rating:</span> ${restaurant.user_rating.aggregate_rating}.
         ${restaurant.user_rating.rating_text}. <br/><span class="resLabel">Info:</span>
         ${restaurant.highlights[0]}. <br/><span class="resLabel">Snittkostnad (2 pers):</span>
         ${restaurant.average_cost_for_two}.<br/><span class="resLabel">Address:</span>
         ${restaurant.location.address}. <img src="${restaurant.thumb}"/></p>`;
});*/