"use strict"

const { Issue } = require("../db/model")

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      const { assigned_to, open, created_by } = req.query
      const queryObject = {}
      queryObject.project = req.params.project

      if (assigned_to) {
        queryObject.assigned_to = assigned_to
      }
      if (open) {
        queryObject.open = open === "true" ? true : false
      }
      if (created_by) {
        queryObject.created_by = created_by
      }

      const issues = await Issue.find(queryObject)
      res.json(issues)
    })

    .post(async function (req, res) {
      let project = req.params.project
      const issue = req.body
      issue.project = project
      const result = await Issue.create(issue)
      res.json({
        assigned_to: result.assigned_to,
        status_text: result.status_text,
        open: result.open,
        _id: result._id,
        issue_title: result.issue_title,
        issue_text: result.issue_text,
        created_by: result.created_by,
        created_on: result.created_on,
        updated_on: result.updated_on,
      })
    })

    .put(async function (req, res) {
      const id = req.body._id
      const update = {}
      if (req.body.issue_title !== "") {
        update.issue_title = req.body.issue_title
      }
      if (req.body.issue_text !== "") {
        update.issue_text = req.body.issue_text
      }
      if (req.body.created_by !== "") {
        update.created_by = req.body.created_by
      }
      if (req.body.assigned_to !== "") {
        update.assigned_to = req.body.assigned_to
      }
      if (req.body.status_text !== "") {
        update.status_text = req.body.status_text
      }
      try {
        await Issue.findByIdAndUpdate(id, update)
        res.json({
          result: "successfully updated",
          _id: id,
        })
      } catch {
        res.json({
          error: "could not update",
          _id: id,
        })
      }
    })

    .delete(async function (req, res) {
      let id = req.body._id
      try {
        await Issue.deleteOne({ _id: id })
        res.json({
          result: "successfully deleted",
          _id: id,
        })
      } catch {
        res.json({
          result: "could not delete",
          _id: id,
        })
      }
    })
}
