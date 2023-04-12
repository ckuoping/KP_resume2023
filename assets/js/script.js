// ============ tooltip initialization ============ //
$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

// ============ show menu ============ //
const showMenu = function(toggleID, navId){
    const toggle = document.getElementById(toggleID);
    const nav = document.getElementById(navId);

    if(toggle && nav)
    {
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show-menu');
        })
    }
}

showMenu('nav-toggle','nav-menu');

// ============ remove menu mobile ============ //
const navlink = document.querySelectorAll('.nav_link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
    console.log('click test')
}

navlink.forEach(n=>n.addEventListener('click',linkAction));

// ============ scroll sections active link ============ //
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');
        console.log(sectionId)
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
       
    })
}
window.addEventListener('scroll', scrollActive);
// ============ show scroll top ============ //
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');

    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll');else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop);
// console.log(sections)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)

}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== REDUCE SIZE WHEN CLICK GENERATING====================*/ 
function scaleCv(){
    document.body.classList.add('scale-cv');
}

function removeScale(){
    document.body.classList.remove('scale-cv');
}

let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

let opt = {
    margin:         0,
    filename:       'Marvin_Chang.pdf',
    image:          {type:'jpeg',quality:0.98},
    html2canvas:    {scale:4},
    jsPDF:          {format:'a4',orientation:'portrait'}
}

function generateResume(){
    html2pdf(areaCv,opt);
}


resumeButton.addEventListener('click',()=>{
    // 1.change into narrower size
    scaleCv();

    // 2.download pdf
    generateResume();

    // 3. after 5 seconds and return to normal layout size
    setTimeout(removeScale,5000);
})


/*====================PORTFOLIO LINK====================*/ 
const portfolioFilters = document.querySelectorAll('.portfolio-filter')

const sideprojectLinks = [
    { name: '#porfolio-1', link: "https://github.com/ckuoping/airqualityAPI" },
    { name: '#porfolio-2', link: "https://ckuoping.github.io/responsive_shopping_web/"},
    { name: '#porfolio-3', link: "http://excited-string.surge.sh/index.html" },
    { name: '#porfolio-4', link: "https://github.com/ckuoping/musicplayer" },
]

function hoverOpenLink(){
    for (let i = 0; i < sideprojectLinks.length; i++) {
        document.querySelector(`${sideprojectLinks[i].name}`).addEventListener('click', function(event) {
            window.open(`${sideprojectLinks[i].link}`);
        })
    
        document.querySelector(`${sideprojectLinks[i].name}`).addEventListener('mouseover', function(event) {
            portfolioFilters[i].classList.remove('disappear')
        })
    
        document.querySelector(`${sideprojectLinks[i].name}`).addEventListener('mouseout', function(event) {
            portfolioFilters[i].classList.add('disappear')
        })
    }
}

hoverOpenLink();