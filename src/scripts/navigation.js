const menuTrigger = document.querySelector(".menu-trigger");
const navigation = document.querySelector("#primary-navigation");
const menuLabel = document.querySelector(".menu-trigger__label");
const desktopMedia = window.matchMedia("(min-width: 60rem)");

const setMenuState = (open) => {
  menuTrigger.setAttribute("aria-expanded", String(open));
  menuLabel.textContent = open ? "Menü schließen" : "Menü öffnen";
  navigation.hidden = !open;
};

const syncNavigation = () => {
  if (desktopMedia.matches) {
    navigation.hidden = false;
    menuTrigger.setAttribute("aria-expanded", "false");
    menuLabel.textContent = "Menü öffnen";
    return;
  }

  setMenuState(false);
};

menuTrigger.addEventListener("click", () => {
  const isOpen = menuTrigger.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuTrigger.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    menuTrigger.focus();
  }
});

desktopMedia.addEventListener("change", syncNavigation);
syncNavigation();

