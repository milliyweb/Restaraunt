var cartCount = 0;
var totalPrice = 0;
var loadTime = 5000 + Math.floor(Math.random() * 3001);
var loadTimer = setTimeout(finishLoading, loadTime);

function finishLoading() {
  clearTimeout(loadTimer);
  document.getElementById("loader").classList.add("hidden");
  document.body.classList.remove("locked");
}

function showMessage(text, type) {
  var icon = "fa-circle-check";
  if (type === "error") {
    icon = "fa-circle-exclamation";
  }
  var note = document.createElement("div");
  note.className = "note " + type;
  note.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + text + '</span><button onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>';
  document.getElementById("notes").appendChild(note);
  setTimeout(function () {
    note.remove();
  }, 3500);
}

function toggleMenu(id) {
  document.getElementById(id).classList.toggle("open");
}

function filterMenu(type) {
  var cards = document.querySelectorAll(".dish-card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
    if (type === "all" || cards[i].getAttribute("data-type") === type) {
      cards[i].style.display = "";
    }
  }
}

function updateCart() {
  document.getElementById("cartCount").textContent = cartCount;
  document.getElementById("cartTotal").textContent = totalPrice.toLocaleString("ru-RU") + " so'm";
}

function addDish(button) {
  cartCount = cartCount + 1;
  totalPrice = totalPrice + Number(button.getAttribute("data-price"));
  updateCart();
  showMessage(button.getAttribute("data-name") + " buyurtmaga qo'shildi", "success");
}

function orderNow() {
  if (cartCount === 0) {
    showMessage("Buyurtma bo'sh", "error");
    return;
  }
  cartCount = 0;
  totalPrice = 0;
  updateCart();
  toggleMenu("cart");
  showMessage("Buyurtmangiz qabul qilindi, tez orada bog'lanamiz", "success");
}

window.onscroll = function () {
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("progressFill").style.width = (window.scrollY / maxScroll) * 100 + "%";
  document.getElementById("header").classList.toggle("scrolled", window.scrollY > 60);
};

document.getElementById("loader").style.setProperty("--time", loadTime + "ms");
document.body.classList.add("locked");