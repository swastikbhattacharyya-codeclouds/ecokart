import { clearCart } from "../cart";

function getParam(name: string) {
  const url = new URLSearchParams(window.location.search);
  return url.get(name) || "-";
}

document.getElementById("name")!.textContent = getParam("name");
document.getElementById("email")!.textContent = getParam("email");
document.getElementById("phone")!.textContent = getParam("phone");
document.getElementById("address")!.textContent = getParam("address");
document.getElementById("total")!.textContent = getParam("total");

clearCart();
