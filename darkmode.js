const theme_btn = document.querySelector(".darkmode_btn");

let user_theme = localStorage.getItem("REST_country_theme");


if (user_theme == null) {
  localStorage.setItem("REST_country_theme", "dark");
}
else if (user_theme == "light") {
  document.documentElement.classList.remove("is_dark");
}


theme_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.documentElement.classList.contains("is_dark")) {
    document.documentElement.classList.remove("is_dark");
    localStorage.setItem("REST_country_theme", "light");
  } else {
    document.documentElement.classList.add("is_dark");
    localStorage.setItem("REST_country_theme", "dark");
  }
});