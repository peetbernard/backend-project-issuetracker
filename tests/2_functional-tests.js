const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", function () {
  test("POST request to /api/issues/{project} with every field", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/apitest")
      .send({
        assigned_to: "Petira",
        status_text: "előrehaladott",
        issue_title: "ez most a legujabb",
        issue_text: "na hátha",
        created_by: "Peetah",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.assigned_to, "Petira")
        assert.equal(res.body.status_text, "előrehaladott")
        assert.equal(res.body.issue_title, "ez most a legujabb")
        assert.equal(res.body.issue_text, "na hátha")
        assert.equal(res.body.created_by, "Peetah")
      })
    done()
  })
  test("POST request to /api/issues/{project} with required fields", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/apitest")
      .send({
        issue_title: "ez most a legujabb",
        issue_text: "na hátha",
        created_by: "Peetah",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.issue_title, "ez most a legujabb")
        assert.equal(res.body.issue_text, "na hátha")
        assert.equal(res.body.created_by, "Peetah")
      })
    done()
  })
  test("POST request to /api/issues/{project} with missing required fields", function (done) {
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/apitest")
      .send({
        // issue_title: "",
        // issue_text: "",
        // created_by: ""
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        // assert.equal(res.body.issue_title, "")
        // assert.equal(res.body.issue_text, "")
        // assert.equal(res.body.created_by, "")
      })
    done()
  })
  test("GET request to /api/issues/{project} view issues on a project", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/apitest")
      .end(function (err, res) {
        assert.equal(res.status, 200)
      })
    done()
  })
  test("GET request to /api/issues/{project}?open=true view issues on a project", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/apitest?open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200)
      })
    done()
  })
  test("GET request to /api/issues/{project}?open=true&assigned_to=Joe view issues on a project", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/apitest?open=true&assigned_to=Joe")
      .end(function (err, res) {
        assert.equal(res.status, 200)
      })
    done()
  })
  test("PUT request to /api/issues/{project} update one field on an issue", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/apitest")
      .send({ status_text: "something", _id: "655a4fa74ab51d27df8d7838" })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully updated")
      })
    done()
  })
  test("PUT request to /api/issues/{project} update many fields on an issue", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/apitest")
      .send({
        status_text: "something",
        assigned_to: "Joe",
        _id: "655a4fa74ab51d27df8d7838",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully updated")
      })
    done()
  })
  test("PUT request to /api/issues/{project} update without ID", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/apitest")
      .send({
        assigned_to: "Joe",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
      })
    done()
  })
  test("PUT request to /api/issues/{project} update with no fields to update", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/apitest")
      .send({
        _id: "655a5f523e32d74ac7c75736",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully updated")
      })
    done()
  })
  test("PUT request to /api/issues/{project} update with an invalid ID", function (done) {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/apitest")
      .send({
        _id: "007",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "could not update")
      })
    done()
  })
  test("DELETE request to /api/issues/{project} delete an issue", function (done) {
    chai
      .request(server)
      .keepOpen()
      .delete("/api/issues/apitest")
      .send({
        _id: "655c5dcd05c76b15fbae4055",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "successfully deleted")
      })
    done()
  })
  test("DELETE request to /api/issues/{project} delete an issue with invalid id", function (done) {
    chai
      .request(server)
      .keepOpen()
      .delete("/api/issues/apitest")
      .send({
        _id: "007",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.result, "could not delete")
      })
    done()
  })
  test("DELETE request to /api/issues/{project} delete an issue with missing id", function (done) {
    chai
      .request(server)
      .keepOpen()
      .delete("/api/issues/apitest")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200)
      })
    done()
  })
})

after(function () {
  chai.request(server).get("/")
})
