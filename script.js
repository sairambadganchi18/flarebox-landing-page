/* ============================
   COUNTER ANIMATION
============================ */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

counter.innerText = "0";

const updateCounter = () => {

const target = +counter.getAttribute("data-target");
const current = +counter.innerText;

const increment = target / 100;

if(current < target){

counter.innerText = `${Math.ceil(current + increment)}`;
setTimeout(updateCounter,20);

}else{

counter.innerText = target;

}

};

updateCounter();

});



/* ============================
   DARK MODE TOGGLE
============================ */

const toggle = document.getElementById("themeToggle");

if(toggle){

toggle.onclick = function(){

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
toggle.innerText = "☀️";
}else{
toggle.innerText = "🌙";
}

};

}



/* ============================
   SMOOTH NAVBAR SCROLL
============================ */

document.querySelectorAll('.nav-links a').forEach(anchor => {

anchor.addEventListener('click', function(e){

e.preventDefault();

const targetId = this.getAttribute('href');
const targetSection = document.querySelector(targetId);

if(targetSection){

targetSection.scrollIntoView({
behavior: "smooth"
});

}

});

});



/* ============================
   ACTIVE NAV LINK ON SCROLL
============================ */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 150;

if(pageYOffset >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){
link.classList.add("active");
}

});

});



/* ============================
   SCROLL REVEAL ANIMATION
============================ */

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});



const hiddenElements = document.querySelectorAll(
".user-card, .feature-box, .how-card, .stat"
);

hiddenElements.forEach((el) => observer.observe(el));