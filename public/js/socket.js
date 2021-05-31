const socket = io();

socket.on("broadcast", (data)=>{
    read_boardLst(data);
});