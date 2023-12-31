const Task = require('../models/Task')
const asyncWrapper = require(`../middleware/async`)
const {createCustomError} = require('../errors/custom-error');
 
const getAllTasks =  asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task})
})

const getTask =  asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params;
   // console.log(req.params);
    const task = await Task.findOne({_id :taskId});
    if(!task){
       return next(createCustomError(`No task find with the id ${taskId}`,404))
       //return res.status(404).json({msg: `No task find with the id ${taskId}`});;
    }
    res.status(200).json({task});
})

const deleteTask =  asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndDelete({_id :taskId});
    if(!task){
       return next(createCustomError('Not found', 404))
       //return res.status(404).json({msg:`Not found`});;
    }
    res.status(200).json({task});
})

const updateTask = asyncWrapper(async(req,res)=>{
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskId},req.body, {
       new:true,
       runValidators:true,
    });
    if(!task){
      return next(createCustomError('Not Found',404))
      //return res.status(200).json({msg:"not found"});
    }
    res.status(200).json({task});
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
