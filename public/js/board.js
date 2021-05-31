const init = () =>{
    read_boardLst(1);
    read_boardLst(2);
    read_boardLst(3);
    read_boardLst(4);
    read_boardLst(5);
    read_boardLst(6);

    initScrollTopPosition();
}

window.addEventListener("DOMContentLoaded", async() => {
    let submitBtnLst = document.querySelectorAll(".submitBtn");
    let importantBtnLst = document.querySelectorAll(".important");
    let clearBtnLst = document.querySelectorAll(".clear");
    let chatValue = document.querySelectorAll(".chatValue");
    
    let year = moment().format("YYYY"); // 년도
    let month = moment().format("MM");// 월
    let date = moment().format("DD"); // 날짜

    let todayMoment = moment().format("YYYY-MM-DD");

    let selectContentIdx = "";
    let selectContentDbIdx = "";

    init();

    $(document).on("click", ".modifyOne", (e)=>{
        let timeSplit = $(e.currentTarget).siblings(".time").text().split(":");
        $(".modify_hour").text(`${timeSplit[0]}시`);
        $(".modify_minute").text(`${timeSplit[1]}분`);
        $(".modify_content").val($(e.currentTarget).siblings(".content").text());
        $(".popupBg").addClass("on");

        selectContentIdx = $(e.currentTarget).data("idx");
        selectContentDbIdx = $(e.currentTarget).data("dbidx");
    });

    $(document).on("click", ".popupBg", (e)=>{
        $(e.target).removeClass("on");
    });
    

    submitBtnLst.forEach( (items, idx, arr) => {
        items.addEventListener("click", (e) => {
            let content = $(e.target).siblings("input[type]").val();
            let hour = $(`.board_hour_${items.dataset.idx}`).text().slice(0, -1);
            let minute = $(`.board_minute_${items.dataset.idx}`).text().slice(0, -1);
            let rsvTme = `${todayMoment} ${hour}:${minute}:00`;
            let important = $(".important").eq(idx).hasClass("on");

            let selectorHour = document.querySelector(`.board_hour_${parseInt(idx)+1}`);
            let selectormMinute = document.querySelector(`.board_minute_${parseInt(idx)+1}`);
            let selectormContent = document.querySelector(`.content_${parseInt(idx)+1}`);

            if(selectorHour.innerText == "시간"){
               alert("시간을 입력해주세요.");
               return;
            }
            if(selectormMinute.innerText == "분"){
                alert("분을 입력해주세요.");
                return;
            }
            if(selectormContent.value == ""){
                alert("내용을 입력해주세요.");
                return;
            }

            white_boardLst(parseInt(items.dataset.idx), rsvTme, content, important);
            initScrollTopPosition();
            selectorHour.innerText ="시간";
            selectormMinute.innerText ="분";
            selectormContent.value = "";
            $(".important").eq(idx).removeClass("on");
        });
    });

    
    chatValue.forEach((items, idx, arr) =>{
        items.addEventListener("keydown", (e) =>{
            if(e.key === "Enter"){
                let content = $(e.target).val();
                let hour = $(`.board_hour_${idx}`).text().slice(0, -1);
                let minute = $(`.board_minute_${idx}`).text().slice(0, -1);
                let rsvTme = `${todayMoment} ${hour}:${minute}:00`;
                let important = $(".important").eq(idx).hasClass("on");
    
                let selectorHour = document.querySelector(`.board_hour_${idx}`);
                let selectormMinute = document.querySelector(`.board_minute_${idx}`);
                let selectormContent = document.querySelector(`.content_${idx}`);
    
                if(selectorHour.innerText == "시간"){
                   alert("시간을 입력해주세요.");
                   return;
                }
                if(selectormMinute.innerText == "분"){
                    alert("분을 입력해주세요.");
                    return;
                }
                if(selectormContent.value == ""){
                    alert("내용을 입력해주세요.");
                    return;
                }
    
                white_boardLst(idx, rsvTme, content, important);
                initScrollTopPosition();
                selectorHour.innerText ="시간";
                selectormMinute.innerText ="분";
                selectormContent.value = "";
                $(".important").eq(idx).removeClass("on");
            }
        });
    });

    importantBtnLst.forEach((items, idx, arr) =>{
        items.addEventListener("click", (e)=>{
            if(!$(items).hasClass("on")){
                $(items).addClass("on");
            }else{
                $(items).removeClass("on");
            }
        });
    });

    clearBtnLst.forEach((items, idx, arr) =>{
        items.addEventListener("click", (e)=>{
            clear_boardLst(parseInt(idx+1));
        });
    });

    $(".modifyBtn").on("click", async(e)=>{
        let content = $(".modify_content").val();
        let hour = $(".modify_hour").text().slice(0, -1);
        let minute = $(".modify_minute").text().slice(0, -1);
        let rsvTme = `${todayMoment} ${hour}:${minute}:00`;

        await update_boardLst(selectContentDbIdx, selectContentIdx, rsvTme, content);
        await read_boardLst(selectContentDbIdx);
    });

    $(".modify_content").on("keydown", async(e)=>{
        if(e.key === "Enter"){
            let content = $(".modify_content").val();
            let hour = $(".modify_hour").text().slice(0, -1);
            let minute = $(".modify_minute").text().slice(0, -1);
            let rsvTme = `${todayMoment} ${hour}:${minute}:00`;
    
            await update_boardLst(selectContentDbIdx, selectContentIdx, rsvTme, content);
            await read_boardLst(selectContentDbIdx);
        }
    });
});