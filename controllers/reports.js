import { Profile } from "../models/profile.js"
import { Report } from "../models/report.js"
import { Dog } from "../models/dog.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    req.body.dog = await Dog.findById(req.body.dogId)
    req.body.duration = Number(req.body.duration)
    const report = await Report.create(req.body)
    const dog = await Dog.findByIdAndUpdate(
      req.body.dogId,
      { $push: { reports: report } },
      { new: true }
    )
    report.author = Profile.findById(
      req.user.profile
    )
    res.status(201).json(report)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)    
  }
}

async function index(req, res) {
  try {
    const reports = await Report.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(reports)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
      .populate(['author'])
    res.status(200).json(report)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    req.body.duration = Number(req.body.duration)
    const report = await Report.findByIdAndUpdate(
      req.params.reportId,
      req.body,
      { new: true }
    )
    //.populate('author')
    res.status(200).json(report)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteReport(req, res) {
  try {
    const report = await Report.findByIdAndDelete(req.params.reportId)
    const profile = await Profile.findById(req.user.profile)
    res.status(200).json(report)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createComment(req, res) {
  try {
    req.body.author = req.user.profile
    const report = await Report.findById(req.params.reportId)
    report.comments.push(req.body)
    await report.save()
    const newComment = report.comments[report.comments.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateComment(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
    const comment = report.comments.id(req.params.commentId)
    comment.text = req.body.text
    await report.save()
    res.status(200).json(report)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteComment(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
    report.comments.remove({ _id: req.params.commentId })
    await report.save()
    res.status(200).json(report)
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
  deleteReport as delete,
  createComment,
  updateComment,
  deleteComment,
}