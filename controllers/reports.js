import { Profile } from "../models/profile.js"
import { Report } from "../models/report.js"
import { Dog } from "../models/dog.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    // const report = await Report.create(req.body)
    // const profile = await Profile.findByIdAndUpdate(
    //   req.user.profile,
    //   { $push: {reports: report } },
    //   { new: true }
    // )
    const dog = await Dog.findById(req.params.dogId)
    dog.reports.push(req.body)
    await dog.save()
    const newReport = dog.reports[dog.reports.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newReport.author = profile
    // report.author = profile._id
    res.status(201).json(newReport)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  }
}

async function index(req, res) {
  try {
    const reports = await Report.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(reports)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
      .populate(['author'])
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.reportId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteReport(req, res) {
  try {
    const report = await Report.findByIdAndDelete(req.params.reportId)
    const profile = await Profile.findById(req.user.profile)
    profile.reports.remove({ _id: req.params.reportId })
    await profile.save()
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
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
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateComment(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
    const comment = report.comments.id(req.params.commentId)
    comment.text = req.body.text
    await report.save()
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteComment(req, res) {
  try {
    const report = await Report.findById(req.params.reportId)
    report.comments.remove({ _id: req.params.commentId })
    await report.save()
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json(error)
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