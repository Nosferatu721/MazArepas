document.addEventListener("DOMContentLoaded", () => {
  let ar = [...document.querySelectorAll("table tbody tr .prod")];
  for (let i = 0; i < ar.length; i += 2) {
    if (ar[i].value !== ar[i + 1].value) {
      ar[i].classList.add('resaltar');
      ar[i + 1].classList.add('resaltar');
    }
  }
});
