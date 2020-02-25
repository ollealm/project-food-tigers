const apiKey = "2fa0e45438e18d9c3ca8b7582953c2bb";
const cityId = 282; //Las Vegas
const cuisineId = 25; //Breakfast
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

    maindata = apiData // sends array to global value maindata

    const container = document.getElementById("resContainer");




    apiData.restaurants.forEach(item => {

      container.innerHTML += `
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

    })

  });



//// FILTER PRICE FUNCTION

const filterPrice = () => {

  let filteredRestaurants = [];
  let filteredCheap = [];
  let filteredMid = [];
  let filteredExpen = [];

  maindata.restaurants.forEach(item => {
    // console.log(item.restaurant.average_cost_for_two);

    const aveCost = item.restaurant.average_cost_for_two

    if (aveCost <= 50) {
      filteredCheap.push(item)
      // document.getElementById("resContainer")
      // console.log(`billigt ${aveCost} ${item.restaurant.name}`)

    } else if (aveCost <= 200) {
      // console.log("mellan", aveCost)
      filteredMid.push(item)

      //add mid-price class
    } else if (aveCost > 200) {
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

  container.innerHTML = "" // resets html

  array.forEach(item => {

    container.innerHTML += `
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
}



const container = document.getElementById("resContainer");



//// DELIVERY FUNCTION

document.getElementById("deliveryDropdown").addEventListener("change", () => revealFilter(deliveryDropdown.value));

revealFilter = (value) => {

  if (value === "Homedelivery") {
    filterDelivery(maindata);

  } else if (value === "Online-booking") {
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
  printRestaurants(hasHomeDelivery)
  // return hasHomeDelivery

};


const filterTableBooking = (maindata) => {
  let hasTableBooking = [];

  maindata.restaurants.forEach(item => {
    if (item.restaurant.has_table_booking !== 0) {
      hasTableBooking.push(item)
    }

  })
  printRestaurants(hasTableBooking)
  // return hasTableBooking
};