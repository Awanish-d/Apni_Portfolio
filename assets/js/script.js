const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});
/* ==========================
        Active Navbar
========================== */

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){

            link.classList.add("active");

        }

    });

});
/* ==========================
      Scroll Progress
========================== */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";

});


/* ==========================
      Back To Top
========================== */

const backToTop =
    document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/* ===========================================
            THEME SWITCH
=========================================== */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeToggle.innerHTML = `<i data-lucide="sun"></i>`;

} else {

    themeToggle.innerHTML = `<i data-lucide="moon"></i>`;

}



themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    themeToggle.innerHTML = isLight
        ? `<i data-lucide="sun"></i>`
        : `<i data-lucide="moon"></i>`;

    lucide.createIcons();

});