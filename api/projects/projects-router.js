// Write your "projects" router here!
const express= require('express')
const projects = require('./projects-model')
const {validateProjectId, validateBody} = require('./projects-middleware')


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

// post  A PROJECT
router.post('/', validateBody, (req,res) => {

    projects.insert(req.project)
    .then( () => res.json(req.project))
    .catch(err => res.status(500).json(
        {
            message:'error posting project',
         err: err.message,
         stack: err.stack,
        }
    ))
    
  })

// UPDATE  A PROJECT
router.put('/:id', validateProjectId, validateBody, (req,res) => {
    const {completed} = req.project
if (completed === undefined){ res.status(400).json({message: 'please update completed status', thingy: completed})}
else
    projects.update(req.params.id, req.project)
    .then(pro => res.json(req.project))
    .catch(err => res.status(500).json(
        {
            message:'error updating project',
         err: err.message,
         stack: err.stack,
        }
    ))
  })

  // DELETE A PROJECT
  router.delete('/:id', validateProjectId, (req,res) => {
    const deleted = req.pro
    projects.remove(req.params.id)
    .then(() => res.json(deleted))
    .catch(err => res.status(500).json(
        {
            message:'error deleted project',
         err: err.message,
         stack: err.stack,
        }
    ))
  })

    // GET  A PROJECT's Actions
router.get('/:id/actions', validateProjectId, (req,res) => {

    res.json(req.pro.actions)
  })

module.exports = router;