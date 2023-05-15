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
      // .populate('owner')
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

async function deleteDog(req, res) {
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

async function createComment(req, res) {
  try {
    req.body.author = req.user.profile
    const dog = await Dog.findById(req.params.dogId)
    dog.comments.push(req.body)
    await dog.save()
    const newComment = dog.comments[dog.comments.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateComment(req, res) {
  try {
    const dog = await Dog.findById(req.params.dogId)
    const comment = dog.comments.id(req.params.commentId)
    comment.text = req.body.text
    await dog.save()
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteComment(req, res) {
  try {
    const dog = await Dog.findById(req.params.dogId)
    dog.comments.remove({ _id: req.params.commentId })
    await dog.save()
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteDog as delete,
  createComment,
  updateComment,
  deleteComment,
  addPhoto,
}
