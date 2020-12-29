// ALl business logic goes here
const Tasks = require('../model/task_models');

// this method is to create the task
exports.create = (req,res)=>{



  if (!req.body.title || !req.body.description){
    return res.status(400).send({
      message: "Required field Cant be empty",
    })
  }

  // * Create a Task

  const task = new Tasks({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    dateTime: req.body.dateTime,
    createdTime: req.body.createdTime,
    updatedTime: req.body.updatedTime,
    // isActive: req.body.isActive,
    userType: req.body.userType,
  });
  console.log(req.body);
  // Save save to database
// task.save((err)=>{
//   if(err){
//     res.send('err')
//     console.log(err)
//   }
//   else{
//     res.send('ok')
//   }
// })
  task.save().then((data)=>{
    res.send(data);
  }).catch((er)=>{
    res.status(500).send({
      message:  "Some Errors While Creating This Task"
    })
  })
}

// Find ALl Tasks


exports.findAllTasks = (req,res)=>{
   Tasks.find()
    .sort({name: -1})
    .then((task)=>{
      res.status(200).send(task)
    })
    .catch((er)=>{
        res.status(500).send({
          message: er.message || "ErroR Occured"
        })
    })
}


// Find One 

exports.findOne = (req,res)=>{
  Tasks.findById(req.params.id)
     .then((task)=>{
       if(!task){
         return res.status(404).send({
           message: 'Task Not Found with id'+ req.params.id
         })
       }
       res.status(200).send(task)
       console.log(task)
     })
     .catch((er)=>{
     return  res.status(500).send({
         message: 'Error retrieving task with id' + req.params.id
       });
     });
}


// Deleting A Task With A Specific Id
exports.delete = (req,res)=>{
  console.log('I am deleting')
  Tasks.findByIdAndRemove(req.params.id)
     .then((task)=>{
       if(!task){
         return res.status(404).send({
           message: 'Task Not Found with id'+ req.params.id
         })
       }
       res.send({ message: "Task deleted successfully!" });
     })
     .catch((er)=>{
     return  res.status(500).send({
         message: 'Could Not Delete A Task' 
       });
     });
}

// Update a task with the specified id in the request

exports.updateTask =  (req,res)=>{
  
   Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((task)=>{
      if(!task){
        return res.status(404).send({
          message: "No Tasks Found"
        })
      }
      res.status(200).send(task)
  })
  .catch((er)=>{
    return res.status(404).send({
      message: "error while updating the post",
    });
  })
}