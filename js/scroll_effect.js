document.addEventListener("DOMContentLoaded", () => {
  const cont = document.querySelector(".camera");
  const layers = document.querySelectorAll(".layer");

  cont.addEventListener("scroll", () => {
    const scrollTop = cont.scrollTop;
    layers[0].style.left = `${scrollTop / 4}px`;
    layers[1].style.left = `${scrollTop / 8}px`;
  });
});
