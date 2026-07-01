


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-square-xmark');
    navbar.classList.toggle('active');
};

//navbar blur on scroll
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// active sections 

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Corrected and Optimized onscroll function
window.onscroll = () => {
    // active sections 
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Remove 'active' from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' to the matching link
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        };
    });

    // sticky navbar
    let header = document.querySelector('header'); // FIX: Use querySelector
    if (header) { // Good practice to check if the header exists
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    // remove navbar on scroll
    menuIcon.classList.remove('fa-square-xmark');
    navbar.classList.remove('active');
};

// scroll reveal 

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
}); 

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .about-content p, .portfolio-container, .skills-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1 ', { origin: 'left' });
ScrollReveal().reveal('.home-content p, ', { origin: 'right' });


// typed js 

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer','Web Developer', 'Web Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


// Dynamic Date

let today = new Date();
let Year = today.getFullYear();

let spanYear = document.querySelector('#span-year');
spanYear.innerHTML = Year;



// //active skill tab
// const items = document.querySelectorAll(".skill-items .items");

// items.forEach(item => {
//     item.addEventListener("click", () => {
//         // Remove active class from all items
//         items.forEach(i => i.classList.remove("active-tab"));

//         // Add active class to the clicked item
//         item.classList.add("active-tab");
//     });
// });

//Skill cards rendering
const tabs = document.querySelectorAll(".skill-items .items");
const cards = document.querySelectorAll(".skill-card");

// Show all skills by default
cards.forEach(card => {
    card.style.display = "";
});

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Remove active class
        tabs.forEach(item => item.classList.remove("active-tab"));

        // Add active class
        tab.classList.add("active-tab");

        const filter = tab.dataset.filter;

        cards.forEach(card => {

            if (filter === "all") {
                card.style.display = "";
            }
            else if (card.classList.contains(filter)) {
                card.style.display = "";
            }
            else {
                card.style.display = "none";
            }

        });

    });

});

//top botton

topButton = document.querySelector(".footer-iconTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {
        topButton.style.display = "";
    } else {
        topButton.style.display = "none";
    }

});

