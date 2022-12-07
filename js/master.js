//check storge color
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  //remove Active class from all color
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      //add active claa
      element.classList.add("active");
    }
  });
}
//Random BackGround Option 
let backgroundOption = true;
//variable to control Interval
let backgroundInterval;
//check on toggle setting storge random bg item
let backgroundLocalItem = localStorage.getItem("back_option");
//check if random bg local not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //remove active from all span
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");

  }
}

//Toggle spin icon setting gear 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //toggle fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  //toggle open
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch color
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //set color on local
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      console.log("yes");
    } else {
      console.log("no");
    }
  });
});
//switch backgroud option
const randombackgroun = document.querySelectorAll(".random-backgrounds span");
randombackgroun.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);

    }
  });
});
//select land element
let landingPage = document.querySelector(".landing-page");
//Get array of img
let imgsArray = ["2.jpg", "3.jpg", "5.jpg", "6.jpg", "1.jpeg"];

//function to random img
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random numb
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change bg image
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();
////////////////////////////////////////////////////////////////////
//select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //skill offset top 
  let skillsOffsetTop = ourSkills.offsetTop;
  //outer height skills
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window height
  let windowHeight = this.innerHeight;
  //scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skills-box .skill-progress span ");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//create popup
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    //create overlay
    let overlay = document.createElement("div");
    //add class to overlay 
    overlay.className = 'popup-overlay';
    //append to the body
    document.body.appendChild(overlay);
    //create popup-overlay
    let popupBox = document.createElement("div");
    //add class to popup
    popupBox.className = 'popup-box';
    if (img.alt !== null) {
      //create heading 
      let imgHeading = document.createElement("h3")
      //create text 
      let imgText = document.createTextNode(img.alt);
      //appent text to head
      imgHeading.appendChild(imgText);
      //append the heading to pop box
      popupBox.appendChild(imgHeading);
    }

    //create img
    let popupImage = document.createElement("img");
    //set img source 
    popupImage.src = img.src;
    //add img to popup box
    popupBox.appendChild(popupImage);
    //append to body 
    document.body.appendChild(popupBox);
    //create the close span
    let closeButton = document.createElement("span");
    //create the close
    let closeButtonText = document.createTextNode("x");
    closeButton.appendChild(closeButtonText);
    //add class to close button
    closeButton.className = 'close-button';
    //add close to pop box 
    popupBox.appendChild(closeButton)
  });
});
//close pop
document.addEventListener("click", function (e) {
  if (e.target.className == 'close-button') {
    //remove 
    e.target.parentNode.remove();
    //Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
//select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
//handle active
function handleActive(ev) {
  //remove Active class
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //add active claa
  ev.target.classList.add("active");
}
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector (".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null) {

  bulletsSpan.forEach( span=>{
    span.classList.remove("active");
  });
      if(bulletLocalItem === 'block'){
        bulletsContainer.style.display ='block';
document.querySelector(".bullets-option .yes").classList.add("active");
}
else{
  bulletsContainer.style.display = 'none';
  document.querySelector(".bullets-option .no").classList.add("active");

}

}

bulletsSpan.forEach(span =>{
  span.addEventListener("click",(e)=>{
    if(span.dataset.display === 'show')
    {
bulletsContainer.style.display ='block';
localStorage.setItem("bullets_option", 'block');
    }
    else{
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'non');

    }
    handleActive (e);
  });
});

//rest button 
document.querySelector(".rest-options").onclick = function (){
// localStorage.clear();
localStorage.removeItem("bullets_option");
localStorage.removeItem("color_option");
localStorage.removeItem("background_option");
//realod
window.location.reload();
};


//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

//stop
e.stopPropagation();
//toggle on menu btn
  this.classList.toggle("menu-active");
//toggle class open 
  tLinks.classList.toggle("open");

};



//click any where outside menu 

document.addEventListener("click",(e)=>{

  if(e.target !== toggleBtn && e.target !== tLinks){
//check if menu  is open
if(tLinks.classList.contains("open")){

//toggle on menu btn
toggleBtn.classList.toggle("menu-active");
//toggle class open 
  tLinks.classList.toggle("open");
}

  }
});


//stop propagation on menu
tLinks.onclick = function (e){
  e.stopPropagation();
}



