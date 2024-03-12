const express = require('express')
const router = express.Router()
const NewTodo = require('../models/NewTodo')

router.get('/display', async (req, res) => {
    const todo = await NewTodo.find()
    res.json(todo)
})

router.post('/save', async (req, res) => {
    try {
        const newtodo = new NewTodo({
            todo: req.body.todo,
            completed: req.body.completed,
        })
        const newtodos = await newtodo.save()
        console.log('save ok' + newtodos)
        res.send('save ok')
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await NewTodo.deleteOne({
        _id: id
    })
    res.sendStatus(204)
})

router.get('/editOne/:id', async (req, res) => {
    const {
        id
    } = req.params
    const getData = await NewTodo.findOne({
        _id: id
    })
    res.send(getData)
})

router.put('/editOne/:id', (req, res) => {
    const {
        id
    } = req.params
    const {
        completed
    } = req.body
    NewTodo.updateOne({
            _id: id
        }, {
            completed
        })
        .then(() => {
            console.log('successfuly! updated the Post!')
            res.sendStatus(204)
        })
        .catch(() => {
            console.log('error!')
            res.sendStatus(500)
        })
})
router.delete('/delete', async (req, res) => {

    await NewTodo.deleteMany({
        completed: true
    })
    res.sendStatus(204)
})

module.exports = router