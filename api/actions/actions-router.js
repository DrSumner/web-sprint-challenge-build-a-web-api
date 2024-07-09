// Write your "actions" router here!
const express= require('express')
const actions = require('./actions-model')
const {validateActionId, validateBody} = require('./actions-middlware')
const {validateProjectId} = require('../projects/projects-middleware')

const router = express.Router();

// GET ACTIONS
router.get('/', (req,res) => {
actions.get()
.then( action => res.json(action))
.catch(err => res.status(500).json(
    {
        message:'error getting actions',
     err: err.message,
    }
))
})

// GET A ACTION
router.get('/:id', validateActionId, (req,res) => {
    res.json(req.act)
    })

// POST A ACTION
router.post('/', validateBody, validateProjectId, (req,res) => {

    actions.insert(req.action)
    .then( () => res.json(req.action))
    .catch(err => res.status(500).json(
        {
            message:'error posting action',
         err: err.message,
         stack: err.stack,
        }
    ))
    
  })  

  // UPDATE  A ACTION
router.put('/:id', validateActionId, validateBody, (req,res) => {

    actions.update(req.params.id, req.action)
    .then(act => res.json(req.action))
    .catch(err => res.status(500).json(
        {
            message:'error updating actions',
         err: err.message,
         stack: err.stack,
        }
    ))
  })

  // DELETE A PROJECT
  router.delete('/:id', validateActionId, (req,res) => {
    const deleted = req.act
    actions.remove(req.params.id)
    .then(() => res.json(deleted))
    .catch(err => res.status(500).json(
        {
            message:'error deleted action',
         err: err.message,
         stack: err.stack,
        }
    ))
  })



module.exports = router;