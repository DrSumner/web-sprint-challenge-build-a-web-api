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
      if(pro){
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

  module.exports = {
    logger,
    validateProjectId,
  }