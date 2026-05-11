const body = document.body;

const toggle = document.querySelector(".dark-toggle input");

const savedMode = localStorage.getItem("dark-mode");

if (savedMode === "enabled") {
  body.classList.add("dark-mode");
  toggle.checked = true;
}

body.addEventListener("darkmode:toggle", (event) => {

  if (event.detail.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
  }
});


toggle.onchange = (event) => {
  event.stopPropagation();
  const darkModeEvent = new CustomEvent("darkmode:toggle", {

    bubbles: true,

    detail: {
      checked: event.target.checked
    }
  });
  toggle.dispatchEvent(darkModeEvent);
};