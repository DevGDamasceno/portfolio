const header = document.querySelector("header");
window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};

/* Tema claro/escuro */
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme){
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
}

applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

themeToggle.onclick = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
};

/* Formulário de contato: abre o app de e-mail com a mensagem pronta */
const CONTACT_EMAIL = 'devgdamasceno@gmail.com';
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = contactForm.nome.value.trim();
    const email = contactForm.email.value.trim();
    const mensagem = contactForm.mensagem.value.trim();

    const assunto = 'Contato pelo portfólio - ' + nome;
    const corpo = 'Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + mensagem;
    window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);

    formStatus.textContent = 'Abrindo seu app de e-mail. Se nada abrir, escreva para ' + CONTACT_EMAIL + '.';
    contactForm.reset();
});

/* Aparecer ao rolar */
const revealTargets = document.querySelectorAll(
    '.main-text, .about-img, .about-text, .services-content, .portfolio-content, .contact-text, .contact-form'
);

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
