// Write your "actions" router here!
const express= require('express')
const actions = require('./actions-model')
const {validateActionId} = require('./actions-middlware')

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

module.exports = router;