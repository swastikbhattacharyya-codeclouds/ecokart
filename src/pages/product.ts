import { fetchProductDetails } from "../product";

async function addProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (!idParam) return;

  const id = parseInt(idParam);

  const title = document.querySelector("#title");
  const subtitle = document.querySelector("#subtitle");
  const description = document.querySelector("#description");
  const image = document.querySelector("#image");
  if (!title || !subtitle || !description || !image) return;

  const product = await fetchProductDetails(id);
  if (!product) return;
  title.innerHTML = product.name;
  subtitle.innerHTML = product.shortDescription;
  description.innerHTML = product.longDescription;
  image.setAttribute("src", product.imagePath);
}

addProductDetails();
