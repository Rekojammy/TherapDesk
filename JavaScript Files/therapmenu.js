const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

const menuDisplay = () => {
    menu.classList.remove('hidden');
    menuBtn.classList.add('hidden');
    closeMenuBtn.classList.remove('hidden');
}

const menuClose = () => {
    menu.classList.add('hidden');
    closeMenuBtn.classList.add('hidden');
    menuBtn.classList.remove('hidden');
}
