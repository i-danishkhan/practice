const Person = require('../models/person');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)

    const response = await newPerson.save()

    console.log('Person saved')
    res.status(200).json(response)

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Person.find()
    console.log('Persons fetched')
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType
    if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
      const data = await Person.find({ work: workType })
      console.log(`Persons with work type ${workType} fetched`)
      res.status(200).json(data)
    } else {
      res.status(400).json({ error: 'Invalid work type' })
    }
  }
  catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    const response = await Person.findByIdAndUpdate(id, data, { new: true, runValidators: true })

    if (!response) {
      return res.status(404).json({ error: 'Person not found' })
    }

    console.log('Person updated')
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const response = await Person.findByIdAndDelete(id)

    if (!response) {
      return res.status(404).json({ error: 'Person not found' })
    }

    console.log('Person deleted')
    res.status(200).json({ message: 'Person deleted successfully' })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})


module.exports = router;