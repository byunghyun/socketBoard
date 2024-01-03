const { Router } = require('express');
const { crossOriginEmbedderPolicy } = require('helmet');
const boardRouter = Router();
const moment = require("moment");

/* NODEJS 데이터베이스 스키마 */
const {Board1} = require('../models/Board1');
const {Board2} = require('../models/Board2');
const {Board3} = require('../models/Board3');
const {Board4} = require('../models/Board4');
const {Board5} = require('../models/Board5');
const {Board6} = require('../models/Board6');

let beforeSearchDateString = moment().format("YYYY-MM-DD")+" 00:00:00";
let afterSearchDateString = moment().format("YYYY-MM-DD")+" 23:59:59";

// UTC+0 기준으로 쿼리를 작성 할 것
// 리눅스 timeZone을 강제로 변경 할 경우에는 Date부분 변경 필요하나 권장되지 않는 방법
boardRouter.get("/board1", async(req, res) =>{
    console.log('beforeSearchDateString', beforeSearchDateString);
    console.log('afterSearchDateString', afterSearchDateString);
    try{
        const board = await Board1.find({
            "rsvTme" : {
                "$gte" : new Date(beforeSearchDateString),
                "$lt" : new Date(afterSearchDateString)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board1", async(req, res)=> {
    try{
        console.log('req.body', req.body);
        const board = new Board1(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board1", async(req, res)=> {
    try{
        const board = await Board1.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board1", async(req, res) =>{
    try{
        const board = await Board1.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board_clear_1", async(req, res) =>{
    try{
        const board = await Board1.DeleteMany({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.get("/board2", async(req, res) =>{
    try{
        const board = await Board2.find({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board2", async(req, res)=> {
    try{
        const board = new Board2(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board2", async(req, res)=> {
    try{
        const board = await Board2.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board2", async(req, res) =>{
    try{
        const board = await Board2.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});


boardRouter.delete("/board_clear_2", async(req, res) =>{
    try{
        const {startDate, endDate} = req.params;
        console.log(startDate);
        const board = await Board2.remove({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});



boardRouter.get("/board3", async(req, res) =>{
    try{
        const board = await Board3.find({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board3", async(req, res)=> {
    try{
        const board = new Board3(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board3", async(req, res) =>{
    try{
        const board = await Board3.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board3", async(req, res)=> {
    try{
        const board = await Board3.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board_clear_3", async(req, res) =>{
    try{
        const {startDate, endDate} = req.params;
        console.log(startDate);
        const board = await Board3.remove({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});



boardRouter.get("/board4", async(req, res) =>{
    try{
        const board = await Board4.find({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board4", async(req, res)=> {
    try{
        const board = new Board4(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board4", async(req, res) =>{
    try{
        const board = await Board4.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board4", async(req, res)=> {
    try{
        const board = await Board4.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board_clear_4", async(req, res) =>{
    try{
        const {startDate, endDate} = req.params;
        console.log(startDate);
        const board = await Board4.remove({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});




boardRouter.get("/board5", async(req, res) =>{
    try{
        const board = await Board5.find({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board5", async(req, res)=> {
    try{
        const board = new Board5(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board5", async(req, res) =>{
    try{
        const board = await Board5.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board5", async(req, res)=> {
    try{
        const board = await Board5.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board_clear_5", async(req, res) =>{
    try{
        const {startDate, endDate} = req.params;
        console.log(startDate);
        const board = await Board5.remove({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.get("/board6", async(req, res) =>{
    try{
        const board = await Board6.find({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.post("/board6", async(req, res)=> {
    try{
        const board = new Board6(req.body);
        await board.save();
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board6", async(req, res) =>{
    try{
        const board = await Board6.deleteOne({
            "idx" : req.body.idx
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.put("/board6", async(req, res)=> {
    try{
        const board = await Board6.updateOne(
            {"idx" : req.body.idx},
            {$set : 
                {
                    "rsvTme":req.body.rsvTme,
                    "content":req.body.content
                }
            }
        );
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

boardRouter.delete("/board_clear_6", async(req, res) =>{
    try{
        const {startDate, endDate} = req.params;
        console.log(startDate);
        const board = await Board6.remove({
            "rsvTme" : {
                "$gte" : new Date(`${beforeSearchDateString}`),
                "$lt" : new Date(`${afterSearchDateString}`)
            }
        }).sort({"rsvTme":1});
        return res.send({ board });
    }catch(err){
        console.log(err);
        return res.status(500).send({err:err.message});
    }
});

module.exports = {
    boardRouter
}