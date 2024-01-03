const read_boardLst = (idx) => {
    $.ajax({
        url: "/board/board"+idx,
        method: "GET",
        success: (data) => {
            console.log('data', data);
            let tme = "";
            let important = "";
            let appendDOM = "";
            $(`.board${idx} div p`).remove();
            for (i = 0; i < data.board.length; i++) {
                console.log('data.board[i].rsvTme', data.board[i].rsvTme);
                tme = moment(data.board[i].rsvTme).tz('Asia/Seoul').format('HH:mm');
                console.log('tme', tme);
                data.board[i].important === true ? important = `style=color:#fc3e5e` : important = ``;
                appendDOM += `<p data-idx="${data.board[i].idx}" ${important}>
                                <span class="time">${tme}</span>
                                <span class="content" style='margin-left:5px;'>${data.board[i].content}</span>
                                <span class="modifyOne" data-idx="${data.board[i].idx}" data-dbidx="${idx}">
                                    <img style="width:13px;display:inline-block;vertical-align:-1px;" src="../images/edit.svg" alt="">
                                </span>
                                <span class="deleteOne" onClick="delete_boardLst(this, ${idx}, ${data.board[i].idx})">X</span>
                            </p>`;
            }
            $(`.board${idx} div`).append(appendDOM);
        },
        complete: (data) => {
            initScrollTopPosition();
            console.log("db조회 성공");
        },
        error: (data, status, err) => {
            console.log("서버와의 통신이 실패했습니다.", JSON.stringify(data) + ";" + status + ";" + err, "error", 0);
        }
    });
}

//imgaesUri, userIp 차후 개발 고도화 시 추가 가능
const white_boardLst = (idx, rsvTme, content, important) => {
    console.log('rsvTme', rsvTme);
    $.ajax({
        url: "/board/board"+idx,
        method: "POST",
        data: "rsvTme=" + rsvTme + "&content=" + content + "&important=" + important,
        success: (data) => {
            read_boardLst(idx);
            $(`.board${idx}`).scrollTop($(".board"+idx+" div").css("height").replace("px", ""));
        },
        complete: (data) => {
            initScrollTopPosition();
            socket.emit("sendMsg", idx);
            console.log("db조회 성공");
        },
        error: (data, status, err) => {
            console.log("서버와의 통신이 실패했습니다.", JSON.stringify(data) + ";" + status + ";" + err, "error", 0);
        }
    });
}

const update_boardLst = (db_idx, idx, rsvTme, content) => {
    $.ajax({
        url: `/board/board${db_idx}`,
        method: "PUT",
        data: "idx="+idx+"&rsvTme="+rsvTme+"&content="+content,
        success: (data) =>{
            $(`.board${db_idx}`).scrollTop($(`.board${db_idx} div`).css("height").replace("px", ""));
        },
        complete:(data)=>{
            socket.emit("sendMsg", db_idx);
            $(".popupBg").removeClass("on");
        },
        error: (data, status, err) => {
            console.log("서버와의 통신이 실패했습니다.1", JSON.stringify(data) + ";" + status + ";" + err, "error", 0);
        }
    });
}

const delete_boardLst = (obj, db_idx, idx) => {
    $.ajax({
        url: `/board/board${db_idx}`,
        method: "DELETE",
        data: `idx=${idx}`,
        success: (data) => {
            $(obj).parent("p").remove();
            socket.emit("sendMsg", db_idx);
            $(`.board${db_idx}`).scrollTop($(`.board${db_idx} div`).css("height").replace("px", ""));
        },
        error: (data, status, err) => {
            console.log("서버와의 통신이 실패했습니다.1", JSON.stringify(data) + ";" + status + ";" + err, "error", 0);
        }
    });
}

const clear_boardLst = (idx) => {
    $.ajax({
        url: `/board/board_clear_${idx}`,
        method: "DELETE",
        success: (data) => {
            $(`.board${idx} div p`).remove();
            socket.emit("sendMsg", idx);
        },
        error: (data, status, err) => {
            console.log("서버와의 통신이 실패했습니다.1", JSON.stringify(data) + ";" + status + ";" + err, "error", 0);
        }
    });
}