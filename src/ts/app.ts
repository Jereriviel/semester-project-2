import { Footer } from "./components/Footer.js";

const footers = document.querySelectorAll("footer");

footers.forEach((footer) => {
  footer.innerHTML = Footer();
});
