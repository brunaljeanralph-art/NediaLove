document.addEventListener("DOMContentLoaded", () => {

  /* =================================
     ELEMENTS
  ================================= */

  const intro = document.querySelector(".intro");
  const envelope = document.querySelector(".envelope-wrap");
  const openButton = document.querySelector(".primary-btn");
  const letterScreen = document.querySelector(".letter-screen");

  const petalLayer = document.querySelector(".petal-layer");
  const sparkleLayer = document.querySelector(".sparkle-layer");

  const music = document.querySelector(
    "#backgroundMusic, #music, audio[data-music], audio"
  );

  const musicStatus = document.querySelector(".music-status");

  const musicButton = document.querySelector(
    "[data-music-toggle], #musicToggle, .music-toggle, .controls .soft-btn"
  );


  /* =================================
     OPEN THE ENVELOPE
  ================================= */

  let letterOpened = false;

  function openLetter() {

    if (letterOpened) return;

    letterOpened = true;

    if (openButton) {
      openButton.disabled = true;
    }

    // Open the envelope
    if (envelope) {
      envelope.classList.add("open");
    }

    // Start the music after the user's click
    playMusic();

    // Begin the transition
    setTimeout(() => {

      if (intro) {
        intro.classList.add("is-leaving");
      }

    }, 500);

    // Reveal the letter
    setTimeout(() => {

      if (intro) {
        intro.hidden = true;
      }

      if (letterScreen) {
        letterScreen.classList.add("visible");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 1250);
  }


  if (openButton) {
    openButton.addEventListener("click", openLetter);
  }


  /* =================================
     MUSIC CONTROL
  ================================= */

  function updateMusicStatus(message) {

    if (musicStatus) {
      musicStatus.textContent = message;
    }
  }


  async function playMusic() {

    if (!music) {
      updateMusicStatus("Aucune musique disponible.");
      return;
    }

    try {

      await music.play();

      updateMusicStatus("♪ La musique joue...");

      if (musicButton) {
        musicButton.textContent = "Ⅱ Mettre en pause";
      }

    } catch (error) {

      updateMusicStatus(
        "Appuie sur le bouton pour lancer la musique."
      );

    }
  }


  function pauseMusic() {

    if (!music) return;

    music.pause();

    updateMusicStatus("Musique en pause.");

    if (musicButton) {
      musicButton.textContent = "▶ Reprendre la musique";
    }
  }


  if (musicButton) {

    musicButton.addEventListener("click", () => {

      if (!music) {
        updateMusicStatus("Aucune musique disponible.");
        return;
      }

      if (music.paused) {
        playMusic();
      } else {
        pauseMusic();
      }

    });

  }


  /* =================================
     FALLING PETALS
  ================================= */

  function createPetal() {

    if (!petalLayer) return;

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.style.left = Math.random() * 100 + "vw";

    const duration = 9 + Math.random() * 9;

    petal.style.animationDuration = duration + "s";

    petal.style.opacity = 0.3 + Math.random() * 0.5;

    petal.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    petalLayer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);

  }


  // Create petals periodically
  if (petalLayer) {

    for (let i = 0; i < 12; i++) {
      setTimeout(createPetal, i * 450);
    }

    setInterval(createPetal, 900);

  }


  /* =================================
     SPARKLES
  ================================= */

  function createSparkles() {

    if (!sparkleLayer) return;

    for (let i = 0; i < 28; i++) {

      const sparkle = document.createElement("span");

      sparkle.className = "sparkle";

      sparkle.style.left = Math.random() * 100 + "vw";

      sparkle.style.top = Math.random() * 100 + "vh";

      sparkle.style.animationDelay =
        Math.random() * 4 + "s";

      sparkle.style.animationDuration =
        2.5 + Math.random() * 3 + "s";

      sparkleLayer.appendChild(sparkle);

    }

  }

  createSparkles();


  /* =================================
     PREVENT DOUBLE CLICK ON BUTTON
  ================================= */

  document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

      button.blur();

    });

  });


  /* =================================
     PAGE INITIALIZATION
  ================================= */

  updateMusicStatus("Une petite surprise t'attend... ❤️");

});