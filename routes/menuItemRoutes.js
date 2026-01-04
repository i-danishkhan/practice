const menuItem = require('../models/MenuItem');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newMenuItem = new menuItem(data)

    const response = await newMenuItem.save()

    console.log('Menu item saved')
    res.status(200).json(response)

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await menuItem.find()
    console.log('Menu items fetched')
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})

router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category
    if (category == 'appetizer' || category == 'main course' || category == 'dessert' || category == 'beverage') {
      const data = await menuItem.find({ category: category })
      console.log(`Menu items in category ${category} fetched`)
      res.status(200).json(data)
    } else {
      res.status(400).json({ error: 'Invalid category' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Internal server error' })
  }
})


module.exports = router;