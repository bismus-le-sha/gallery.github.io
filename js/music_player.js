const audio = new Audio("../music/allways forever - slowed.wav");
audio.loop = true;
const checkboxInput = document.getElementById("checkboxInput");
checkboxInput.addEventListener("change", () => {
  if (checkboxInput.checked) {
    audio.pause();
  } else {
    audio.play();
  }
});
