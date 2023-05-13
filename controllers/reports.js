import { Profile } from "../models/profile.js"
import { Report } from "../models/report.js"

async function create(req, res) {
  try {
    req.body.owner = req.user.profile 
    const report = await Report.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {reports: report } },
      { new: true }
    )
    report.author = profile
    res.status(201).json(report)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  }
}

export {
  create,
}