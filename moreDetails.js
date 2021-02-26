let countryCode = "IND";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has("cc")) {
  countryCode = urlParams.get("cc");
}

let data = JSON.parse(localStorage.getItem("REST_Country_api_data")) || "";
if (data == "") {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      data = res;
      localStorage.setItem("REST_Country_api_data", JSON.stringify(data));
      renderMoreData();
    });
} else {
  renderMoreData();
}

function renderMoreData() {
  const flag = document.querySelector("#flag");
  const name = document.querySelector("#name");
  const native_name = document.querySelector("#native_name");
  const population = document.querySelector("#population");
  const region = document.querySelector("#region");
  const sub_region = document.querySelector("#sub_region");
  const capital = document.querySelector("#capital");
  const top_level_domain = document.querySelector("#top_level_domain");
  const currencies = document.querySelector("#currencies");
  const languages = document.querySelector("#languages");
  const border_countries = document.querySelector("#border_countries");

  const country = data.find((item) => {
    return item.alpha3Code == countryCode;
  });
  // console.log(flag);
  flag.setAttribute("src", country.flag);
  name.innerHTML = country.name;
  native_name.innerHTML = country.nativeName;
  population.innerHTML = country.population;
  region.innerHTML = country.region;
  sub_region.innerHTML = country.subregion;
  capital.innerHTML = country.capital;
  top_level_domain.innerHTML = country.topLevelDomain.join(", ");
  currencies.innerHTML = country.currencies.map((item) => item.name).join(", ");
  languages.innerHTML = country.languages.map((item) => item.name).join(", ");
  country.borders.map((item) => {
    const border_country = data.find((ele) => {
      return ele.alpha3Code == item;
    });
    border_countries.innerHTML += `
        <a class="btn btn_border_country" href="country.html?cc=${border_country.alpha3Code}">${border_country.name}</a>
        `;
  });

  console.log(country);
}
