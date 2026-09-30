// Show one page at a time without reloading the browser.
let activeScreen = 'home';

function showScreen(id) {
  const next = document.getElementById(id);
  if (!next) return;

  const current = document.getElementById(activeScreen);
  if (current) {
    current.classList.remove('is-active');
    current.hidden = true;
  }

  // Reset the last-page reveal when returning to it, so it can be opened again.
  if (id === 'gift-4') {
    document.querySelector('.final-message').hidden = true;
    document.querySelector('[data-reveal]').hidden = false;
  }

  next.hidden = false;
  next.classList.remove('is-active');
  void next.offsetWidth; // Restart the soft entrance animation.
  next.classList.add('is-active');
  activeScreen = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.go));
});
document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('opening');
    window.setTimeout(() => {
      button.classList.remove('opening');
      showScreen(button.dataset.open);
    }, 220);
  });
});
document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.next));
});
document.querySelectorAll('[data-prev]').forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.prev));
});
document.querySelectorAll('[data-back]').forEach((button) => {
  button.addEventListener('click', () => showScreen('gifts'));
});
document.querySelectorAll('[data-home]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    showScreen('home');
  });
});

// Keep the artwork visible until a valid user photo has loaded.
document.querySelectorAll('img[data-photo]').forEach((image) => {
  const fallback = image.parentElement.querySelector('.photo-fallback');
  image.addEventListener('load', () => {
    image.style.display = 'block';
    if (fallback) fallback.style.display = 'none';
  });
  image.addEventListener('error', () => {
    image.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  });
  if (image.complete && image.naturalWidth > 0) {
    image.style.display = 'block';
    if (fallback) fallback.style.display = 'none';
  }
});

// Let the reader reveal the last message when they are ready.
const revealButton = document.querySelector('[data-reveal]');
if (revealButton) {
  revealButton.addEventListener('click', () => {
    document.querySelector('.final-message').hidden = false;
    revealButton.hidden = true;
  });
}
