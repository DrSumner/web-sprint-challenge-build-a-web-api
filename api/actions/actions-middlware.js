// add middlewares here related to actions
const actions = require('./actions-model')
const projects = require('../projects/projects-model')
const {validateProjectId} = require('../projects/projects-middleware')

function validateActionId(req, res, next) {
    actions.get(req.params.id)
    .then(act => {
      if(act && Object.keys(act).length > 0){
        req.act = act
        next() }
      else
      res.status(404).json({message: "action not found" })
   
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
    const action = req.body
   
    if(!action.notes || !action.description){
     res.status(400).json({message: 'please provide notes & description'})
    } else{ req.action = action; next()}
    
 }

module.exports = {
    validateActionId,
    validateBody,
  }