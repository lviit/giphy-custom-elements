import Search from "./components/Search.js";
import GifList from "./components/GifList.js";
import GifItem from "./components/GifItem.js";

customElements.define("gif-list", GifList);
customElements.define("gif-item", GifItem);
customElements.define("search-app", Search);

document.getElementById("root").innerHTML = "<search-app></search-app>";
