// add middlewares here related to projects
const projects = require('./projects-model')

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    )
  
    next()
  }

  function validateProjectId(req, res, next) {
    projects.get(req.params.id)
    .then(pro => {
      if(pro && Object.keys(pro).length > 0){
        req.pro = pro
        next() }
      else
      res.status(404).json({message: "project not found" })
   
    })
    .catch(err => {
      res.status(500).json({
        message: 'error bebe',
      err: err.message,
      stack: err.stack,
      })
    })
}
    function validateBody(req,res,next) {
       const project = req.body

       if(!project.name || !project.description){
        res.status(400).json({message: 'please provide name & description'})
       } else{ req.project = project; next()}
       
    }
  

  module.exports = {
    logger,
    validateProjectId,
    validateBody,
  }