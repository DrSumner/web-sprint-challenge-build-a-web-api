// add middlewares here related to actions
const actions = require('./actions-model')

function validateActionId(req, res, next) {
    actions.get(req.params.id)
    .then(act => {
      if(act){
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

module.exports = {
    validateActionId,
  }