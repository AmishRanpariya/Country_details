let countryCode = "IND";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has("cc")) {
	countryCode = urlParams.get("cc");
}

let data = JSON.parse(localStorage.getItem("REST_Country_api_data")) || "";
if (data == "") {
	fetch("https://restcountries.com/v3.1/all")
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
		return item.cca3 == countryCode;
	});
	console.log(country);
	// console.log(flag);
	flag.setAttribute("src", country.flags.svg);

	name.innerHTML = country.name.common;

	native_name.innerHTML = country.name.official;

	population.innerHTML = country.population.toLocaleString("en-US");

	region.innerHTML = country.region;

	sub_region.innerHTML = country.subregion;

	capital.innerHTML = country.capital;

	top_level_domain.innerHTML = country.tld.join(", ");

	currencies.innerHTML = Object.keys(country.currencies)
		.map((item) => country.currencies[item].name)
		.join(", ");

	languages.innerHTML = Object.keys(country.languages)
		.map((item) => country.languages[item])
		.join(", ");

	country.borders.map((item) => {
		const border_country = data.find((ele) => {
			return ele.cca3 == item;
		});
		border_countries.innerHTML += `
        <a class="btn btn_fill" href="https://amishranpariya.github.io/Country_details/About/country.html?cc=${border_country.cca3}">${border_country.name.common}</a>
        `;
	});

	// console.log(country);
}
