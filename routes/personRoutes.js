const Person = require('../models/person');
const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// signup route
router.post('/signup', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)

    const response = await newPerson.save()

    console.log('Person saved')

    const payload = { id: response._id, work: response.work };

    const token = generateToken(payload);
    console.log('Token is: ', token)

    res.status(200).json({ response: response, token: token })

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

// login route
router.post('/login', async (req, res) => {
  try {
    // extract username and password from request body
    const { username, password } = req.body;

    // find the person by username
    const person = await Person.findOne({ username: username });

    // if person not found or password is incorrect
    if (!person || !(await person.isValidPassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // generate JWT token
    const payload = { id: person._id, work: person.work };
    const token = generateToken(payload);

    // resturn token as response
    res.json({ token })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const userID = userData.id;
    const person = await Person.findById(userID);

    res.status(200).json({ person });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', jwtAuthMiddleware, async (req, res) => {
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