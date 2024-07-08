// Write your "projects" router here!
const express= require('express')
const projects = require('./projects-model')
const {validateProjectId} = require('./projects-middleware')


const router = express.Router();

// GET PROJECTS
router.get('/', (req,res) => {
    projects.get()
.then( pros => res.json(pros))
.catch(err => res.status(500).json(
    {
        message:'error getting projects',
     err: err.message,
     stack: err.stack,
    }
))
})

// GET  A PROJECT
router.get('/:id', validateProjectId, (req,res) => {
  res.json(req.pro)
})

module.exports = router;