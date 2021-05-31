let [todayTime, hours, minutes, seconds, milliseconds, currentDate] = [null, null, null, null, null, null];

const initScrollTopPosition = () => {
    let bodyLst = document.querySelectorAll(".chatBody");
    bodyLst.forEach((items, idx, arr) => {
        if($(`.board${idx+1} div`).css("height") != "" || typeof $(`.board${idx+1} div`).css("height") != undefined){
            $(`.board${idx+1}`).scrollTop($(`.board${idx+1} div`).css("height").replace("px", ""));
        }
    });
}