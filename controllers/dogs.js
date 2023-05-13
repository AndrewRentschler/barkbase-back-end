import { Profile } from '../models/profile.js'
import { Dog } from '../models/dog.js'

async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const dog = await Dog.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { dogs: dog } },
      { new: true }
    )
    dog.owner = profile
    res.status(201).json(dog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const dogs = await Dog.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    res.status(200).json(dogs)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const dog = await Dog.findById(req.params.dogId)
      .populate(['owner', 'comments.author'])
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

export { create, index, show, }