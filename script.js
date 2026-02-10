// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]:not(.email-protected)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 100;

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        // At bottom of page, highlight the last section (Contact)
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            const lastId = lastSection.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${lastId}`) {
                    link.classList.add('active');
                }
            });
            return; // Exit early
        }
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightNavOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

highlightNavOnScroll();

// Email Protection
function decodeEmail(link) {
    if (link.dataset.decoded === 'true') return;

    const user = link.getAttribute('data-u');
    const domain = link.getAttribute('data-d');

    if (user && domain) {
        link.href = `mailto:${user}@${domain}`;
        link.dataset.decoded = 'true';
    }
}

document.addEventListener('mouseover', function (e) {
    if (e.target.closest('.email-protected')) {
        decodeEmail(e.target.closest('.email-protected'));
    }
});

document.addEventListener('click', function (e) {
    if (e.target.closest('.email-protected')) {
        const link = e.target.closest('.email-protected');
        decodeEmail(link);
        // Let the default action proceed now that href is set
    }
});
