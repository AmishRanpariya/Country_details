const container = document.querySelector(".container");

let data = JSON.parse(localStorage.getItem("REST_Country_api_data")) || "";

if (data == "") {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      data = res;
      localStorage.setItem("REST_Country_api_data", JSON.stringify(data));
      renderData();
    })
    .catch(err => {
      console.log(err);
      container.innerHTML = "<h3>NO DATA FOUND</h3>";
    });
} else {
  renderData();
}

function renderData() {

  container.innerHTML = "";

  // data = data.filter((item) => {
  //   item = Object.values(item);
  //   item = JSON.stringify(item).toLocaleLowerCase();
  //   return item.includes("");
  // });


  data.forEach((item, index) => {
    if (index < 4) {

      container.innerHTML += `
        <a class="card" href="country.html?cc=${item.alpha3Code}">
        <div class="upper">
            <img src="${item.flag}" alt="flag">
        </div>
        <div class="lower">
            <h3>${item.name}</h3>
            <p>
            <span class="label" >Population: </span>
            <span class="label_value" >${item.population}</span>
            </p>
            <p>
            <span class="label" >Region: </span>
            <span class="label_value" >${item.region}</span>
            </p>
            <p>
            <span class="label" >Capital: </span>
            <span class="label_value" >${item.capital}</span>
            </p>
        </div>
        </a>
          `;
    }
  });
  // console.log(data);
}