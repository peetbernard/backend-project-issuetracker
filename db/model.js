const mongoose = require("mongoose")

const IssueSchema = new mongoose.Schema(
  {
    project: {type: String},
    issue_title: {
      type: String,
      required: [true, "Please provide issue title"],
    },
    issue_text: { type: String, required: [true, "Please provide issue text"] },
    created_by: { type: String, required: true },
    assigned_to: { type: String },
    open: { type: Boolean, default: true },
    status_text: { type: String },
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
)

const Issue = mongoose.model("Issue", IssueSchema)

module.exports = { Issue }
