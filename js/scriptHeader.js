const burger = document.getElementById('hamburger');
const nav = document.getElementById('mobile-nav');
burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
});