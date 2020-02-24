const apiKey = "6bd2892ddab2e2361c20e0ea6bbd659c";
const cityId = 282; //Las Vegas
const cuisineId = 182; //Breakfast
//https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}

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
  .then(json => {
    console.log("API response:", json);

    //json.restaurants.forEach(item => {
    //console.log(item.restaurant.name);
    //});

    json.restaurants.forEach(item => {
      console.log(item.restaurant.name);
      console.log(item.restaurant.user_rating.aggregate_rating);
      console.log(item.restaurant.user_rating.rating_text);
      console.log(item.restaurant.highlights[0]);
      console.log(item.restaurant.average_cost_for_two);
      console.log(item.restaurant.location.address);

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