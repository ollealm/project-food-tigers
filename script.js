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

    maindata = apiData // sends array to global value maindata

    const container = document.getElementById("resContainer");



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
    });

  });



//// FILTER PRICE FUNCTION

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

  })

  if (priceDropdown.value === "cheap") {
    console.log("cheap", filteredCheap)

    printRestaurants(filteredCheap)

  } else if (priceDropdown.value === "mid") {
    console.log("mid", filteredMid)

    printRestaurants(filteredMid)

  } else {
    console.log("exp", filteredExpen)

    printRestaurants(filteredExpen)
  }
};

document.getElementById('priceDropdown').addEventListener('change', () => filterPrice())



/// SORT FUNCTION

const sortCost = (selected) => {
  const restaurants = maindata.restaurants
  if (selected === "low") {
    const lowFirst = restaurants.sort((a, b) => a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two)
    printRestaurants(lowFirst)

  } else if (selected === "high") {
    const highFirst = restaurants.sort((a, b) => b.restaurant.average_cost_for_two - a.restaurant.average_cost_for_two)
    printRestaurants(highFirst)
  }
}

document.getElementById('sortPrice').addEventListener("change", () => sortCost(sortPrice.value))




/// PRINT PRICE FUNCTION

const printRestaurants = (array) => {

  const container = document.getElementById("resContainer");

  container.innerHTML = "" // resets html

  array.forEach(item => {

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
}