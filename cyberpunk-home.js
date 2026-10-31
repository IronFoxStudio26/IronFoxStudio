(() => {
  const button = document.querySelector(".cyber-menu-toggle");
  const nav = document.querySelector(".cyber-nav");
  button?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(opened));
  });
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  const word = document.querySelector(".billboard-word");
  if (word && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const words = ["PLAY", "CREATE", "EXPLORE", "DISCOVER"];
    let i = 0;
    window.setInterval(() => { i = (i + 1) % words.length; word.textContent = words[i]; }, 3200);
  }
  const account = document.querySelector(".cyber-account");
  document.addEventListener("click", (event) => {
    const menu = document.querySelector("#profileMenu");
    if (menu && account && !account.contains(event.target)) menu.classList.remove("show");
  });
})();