const Questions = require('../models/Questions')
const mongoose = require('mongoose')


 const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions({...postQuestionData})
    try {
        await postQuestion.save();
        res.status(200).json({message:"Posted Question successfully"})
    } catch (error) {
        console.log(error)
        res.status(409).json({message:"not able to post the question"})
    }
}
 
const getAllquestions = async(req,res) =>{
    try {
        const questionList = await Questions.find({})
        res.status(200).json(questionList)
        
    } catch (error) {
        res.status(404).json({message:"error 404"})
    }

}

const deleteQuestion = async (req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send('Question Unavailable')
    }
    try {
        await Questions.findByIdAndDelete(_id)
        res.status(200).json({message:'Successfully Deleted'})
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log(error)
    }
}
const voteQuestion = async (req,res)=>{
    const {id:_id}=req.params;
    const {value,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send('Question Unavailable')
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id)=> id === String(userId))
        const downIndex = question.downVote.findIndex((id)=> id === String(userId))

        if(value === 'upVote')
        {
            if(downIndex !== -1){  // if user alredy down voted and want to upvote now then we are removing the userId from downvote
                question.downVote=question.downVote.filter((id)=> id !== String(userId))
            }
            if(upIndex === -1){   // adding the userId to upVote // if he is not alredy voted
                question.upVote.push(userId)
            }else{
                question.upVote=question.upVote.filter((id)=> id !== String(userId))
            }
        }

        else if(value === 'downVote')
        {
            if(upIndex !== -1){  // if user alredy up voted and want to downvote now then we are removing the userId from upvote
                question.upVote=question.upVote.filter((id)=> id !== String(userId))
            }
            if(downIndex === -1){   // adding the userId to downVote // if he is not alredy voted
                question.downVote.push(userId)
            }else{
                question.downVote=question.downVote.filter((id)=> id !== String(userId))
            }
        }

        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message:"voted successfully"})
    } catch (error) {
        res.status(404).json({message:"id not found"})
    }
}

module.exports={AskQuestion,getAllquestions,deleteQuestion,voteQuestion}