    (() => {
      const intro = document.getElementById('intro');
      const letterScreen = document.getElementById('letterScreen');
      const openButton = document.getElementById('openLetter');
      const envelopeWrap = document.getElementById('envelopeWrap');
      const petalLayer = document.getElementById('petalLayer');
      const sparkleLayer = document.getElementById('sparkleLayer');
      const musicButton = document.getElementById('musicButton');
      const musicStatus = document.getElementById('musicStatus');
      const music = document.getElementById('backgroundMusic');
      const topButton = document.getElementById('topButton');
      let opened = false;

      function createPetal() {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${8 + Math.random() * 9}s`;
        petal.style.animationDelay = `${Math.random() * 1.5}s`;
        petal.style.opacity = `${0.25 + Math.random() * 0.55}`;
        petal.style.transform = `scale(${0.55 + Math.random() * 0.85})`;
        petalLayer.appendChild(petal);
        window.setTimeout(() => petal.remove(), 19000);
      }

      function startPetals() {
        for (let i = 0; i < 18; i += 1) {
          window.setTimeout(createPetal, i * 180);
        }
        window.setInterval(createPetal, 750);
      }

      function createSparkles() {
        for (let i = 0; i < 34; i += 1) {
          const sparkle = document.createElement('span');
          sparkle.className = 'sparkle';
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = `${Math.random() * 100}%`;
          sparkle.style.animationDelay = `${Math.random() * 4}s`;
          sparkle.style.animationDuration = `${2.5 + Math.random() * 3}s`;
          sparkleLayer.appendChild(sparkle);
        }
      }

      openButton.addEventListener('click', () => {
        if (opened) return;
        opened = true;
        envelopeWrap.classList.add('open');
        openButton.disabled = true;
        openButton.textContent = 'Ta surprise s’ouvre… ♥';
        window.setTimeout(() => {
          intro.classList.add('is-leaving');
          window.setTimeout(() => {
            intro.hidden = true;
            letterScreen.classList.add('visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            startPetals();
          }, 650);
        }, 650);
      });

      musicButton.addEventListener('click', async () => {
        if (music.paused) {
          try {
            await music.play();
            musicButton.textContent = 'Ⅱ Mettre la musique en pause';
            musicButton.setAttribute('aria-pressed', 'true');
            musicStatus.textContent = '';
          } catch (error) {
            musicStatus.textContent = 'Ajoute ton fichier musical dans le dossier assets sous le nom music.mp3.';
          }
        } else {
          music.pause();
          musicButton.textContent = '♫ Écouter notre ambiance';
          musicButton.setAttribute('aria-pressed', 'false');
        }
      });

      music.addEventListener('error', () => {
        musicStatus.textContent = 'Pour activer la musique, place un fichier MP3 dans assets/music.mp3.';
      });

      topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      createSparkles();
    })();
