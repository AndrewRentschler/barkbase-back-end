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

async function update(req, res) {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.dogId,
      req.body,
      { new: true }
    ).populate('owner')
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteBlog(req, res) {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.dogId)
    const profile = await Profile.findById(req.user.profile)
    profile.dogs.remove({ _id: req.params.dogId })
    await profile.save()
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteBlog as delete
}
