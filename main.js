const container = document.querySelector(".container");
mainvideo = container.querySelector("video"),
videotimeline=container.querySelector(".video-timeline"),
progressbar=container.querySelector(".progress-bar"),
volumebtn=container.querySelector(".volume i"),
volumeslider=container.querySelector(".left input"),
currentvidtime=container.querySelector(".current-timer"),
vidDuration=container.querySelector(".Video-duration"),
skipbackward = container.querySelector(".skip-backward i"),
skipforward = container.querySelector(".skip-forward i"),
playpausebtn = container.querySelector(".play-pause i"),
speedbtn = container.querySelector(".playback-speed span"),
speedoption = container.querySelector(".speed-option"),
picinpicbtn=container.querySelector(".pic-in-pic span"),
fullscreenbtn=container.querySelector(".fullscreen i");
let timer;

const hidecontrols=()=>{
    if(mainvideo.paused)return;
    timer=setTimeout(()=>{
        container.classList.remove("show-controls")

    },3000);
}
hidecontrols();

container.addEventListener("mousemove",()=>{
    container.classList.add("show-controls");
    clearTimeout(timer)
    hidecontrols();

})

const formatetime=time =>{
    let seconds=Math.floor(time%60),
    minutes=Math.floor(time/60)%60,
    hours=Math.floor(time/3600);

    seconds=seconds<10? `0${seconds}`:seconds;
    minutes=minutes<10? `0${minutes}`:minutes;
    hours=hours<10? `0${hours}`:hours;
    

    if(hours==0){
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}


mainvideo.addEventListener("loadeddata",e=>{
    vidDuration.innerText=formatetime(e.target.duration);

})




mainvideo.addEventListener("timeupdate",e=>{
    let{currentTime,duration}=e.target
    let percent=(currentTime/duration)*100;
    progressbar.style.width=`${percent}%`;
    currentvidtime.innerText=formatetime(currentTime);
});

videotimeline.addEventListener("click",e=>{
    let timelineWidth=videotimeline.clientWidth;
    mainvideo.currentTime=(e.offsetX/timelineWidth)*mainvideo.duration
})

const draggableProgressBar= e =>{
    let timelineWidth=videotimeline.clientWidth;
    progressbar.style.width=`${e.offsetX}px`
    mainvideo.currentTime=(e.offsetX/timelineWidth)*mainvideo.duration;
    currentvidtime.innerText=formatetime(mainvideo.currentTime);
}


videotimeline.addEventListener("mousedown",()=>{
    videotimeline.addEventListener("mousemove",draggableProgressBar)
});
document.addEventListener("mouseup",()=>{
    videotimeline.removeEventListener("mousemove",draggableProgressBar)
});




videotimeline.addEventListener("mousemove",e=>{
    const progresstime=videotimeline.querySelector("span");
    let offsetX=e.offsetX;
    progresstime.style.left=`${offsetX}px`
    let timelineWidth=videotimeline.clientWidth;
    let percent=(e.offsetX/timelineWidth)*mainvideo.duration;
    progresstime.innerText=formatetime(percent)
})



volumebtn.addEventListener("click",()=>{
    if(!volumebtn.classList.contains("fa-volume-high")){
        mainvideo.volume=0.5;
        volumebtn.classList.replace("fa-volume-xmark","fa-volume-high")
    }else{
        mainvideo.volume=0.0;
        volumebtn.classList.replace("fa-volume-high","fa-volume-xmark")
    }
    volumeslider.value=mainvideo.volume

})
volumeslider.addEventListener("input",e=>{
    mainvideo.volume=e.target.value;
    if(e.target.value==0){
        volumebtn.classList.replace("fa-volume-high","fa-volume-xmark")

    }else{
        volumebtn.classList.replace("fa-volume-xmark","fa-volume-high")
    }

})
speedbtn.addEventListener("click",()=>{
    speedoption.classList.toggle("show")
})
speedoption.querySelectorAll("li").forEach(Option => {
    Option.addEventListener("click",()=>{
        mainvideo.playbackRate=Option.dataset.speed
        speedoption.querySelector(".active").classList.remove("active")
        Option.classList.add("active");

    })
    
});

document.addEventListener("click",e=>{
    if(e.target.tagName!=="SPAN" || e.target.className!=="material-symbols-rounded"){
        speedoption.classList.remove("show")
    }
})
picinpicbtn.addEventListener("click",()=>{
    mainvideo.requestPictureInPicture();
})

fullscreenbtn.addEventListener("click",()=>{
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement){
        fullscreenbtn.classList.replace("fa-expand","fa-compress")
        return document.exitFullscreen();
    }
    fullscreenbtn.classList.replace("fa-compress","fa-expand");
    container.requestFullscreen();
})

skipbackward.addEventListener("click",()=>{
    mainvideo.currentTime-=5;
});
skipforward.addEventListener("click",()=>{
    mainvideo.currentTime+=5;
})

playpausebtn.addEventListener("click",()=>{
    mainvideo.paused ? mainvideo.play():mainvideo.pause()
})

mainvideo.addEventListener("play",()=>{
    playpausebtn.classList.replace("fa-play","fa-pause")
})
mainvideo.addEventListener("pause",()=>{
    playpausebtn.classList.replace("fa-pause","fa-play")
})
