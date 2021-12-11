const filter_switch = document.querySelector(".filter_select");

const filter_option_box = document.querySelector(".filter_options");

const filter_options = document.querySelectorAll(".filter_options .option");

filter_switch.addEventListener("click", () => {
	filter_option_box.classList.toggle("hidden");
});

filter_options.forEach((item) => {
	item.addEventListener("click", () => {
		if (item.innerText == "None") {
			filter_switch.innerText = "Filter by Region";
		} else {
			filter_switch.innerText = item.innerText;
		}
		filter_option_box.classList.toggle("hidden");
		search_and_filter();
	});
});

const container = document.querySelector("#country_data_container");
const search_input = document.querySelector("#search_input");
search_input.addEventListener("input", (e) => {
	e.preventDefault();
	search_and_filter();
});

function search_and_filter() {
	if (filter_switch.innerText == "Filter by Region") {
		renderData(search_input.value);
	} else {
		renderData(search_input.value, filter_switch.innerText);
	}
}

let data = JSON.parse(localStorage.getItem("REST_Country_api_data")) || "";
/*
*
*
*
//depreceted
*
*
*
*/
if (data == "") {
	fetch("https://restcountries.com/v3.1/all")
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			data = res;
			localStorage.setItem("REST_Country_api_data", JSON.stringify(data));
			renderData();
		})
		.catch((err) => {
			console.log(err);
			container.innerHTML = "<h3>NO DATA FOUND</h3>";
		});
} else {
	renderData();
}

function renderData(term = "", term2 = "") {
	container.innerHTML = "";

	tempdata = data.filter((item) => {
		item = Object.values(item);
		item = JSON.stringify(item).toLocaleLowerCase();
		return (
			item.includes(term.toLocaleLowerCase()) &&
			item.includes(term2.toLocaleLowerCase())
		);
	});
	//
	tempdata.forEach((item, index) => {
		if (index < 20) {
			console.log(item);
			container.innerHTML += `
        <a class="card" href="https://amishranpariya.github.io/Country_details/About/country.html?cc=${
					item.cca3
				}">
        <div class="upper">
            <img src="${item.flags.svg}" alt="flag">
        </div>
        <div class="lower">
            <h3>${item.name.common}</h3>
            <p>
            <span class="label" >Population: </span>
            <span class="label_value" >${item.population.toLocaleString(
							"en-US"
						)}</span>
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
}
