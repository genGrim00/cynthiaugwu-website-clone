const scroll = new LocomotiveScroll({
  el: document.querySelector('.main'),
  smooth: true
});

function firstPageAnim(){
  let tl = gsap.timeline();
  
  tl.from('.nav', {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOUt
  })
  .to('.boundingelem', {
    y: 0,
    ease: Expo.easeInOUt,
    duration: 1,
    stagger: .2
  })
  .from('.footer', {
    y: -10,
    opacity: 0,
    duration: .5,
    delay: -.4,
    ease: Expo.easeInOUt
  })
}
let timer;
function circleSizeChanger(){

  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;
  window.addEventListener("mousemove", (details) =>{
    clearTimeout(timer);

    xscale = gsap.utils.clamp(.6,1.2, details.clientX - xprev);
    yscale = gsap.utils.clamp(.6,1.2, details.clientY - yprev)


    xprev = details.clientX;
    yprev = details.clientY;
    circleMouseFollower(xscale,yscale);
    timer = setTimeout(() => {
      document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`; 
    },100)
  })  
};

function circleMouseFollower(xscale,yscale){
  window.addEventListener('mousemove', (details) => {
    document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`; 
  })
}

circleSizeChanger();
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".second>.elem").forEach((elem) => {
  let rotate = 0;
  let rotDiff = 0;

  elem.addEventListener("mouseleave", (details)=>{   
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: .5
    });
  });


  elem.addEventListener("mousemove", (details)=>{
  let diff = details.clientY - elem.getBoundingClientRect().top;
  rotDiff = details.clientX - rotate;
  rotate = details.clientX
  
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20,20,rotDiff)
    });
  });

});
