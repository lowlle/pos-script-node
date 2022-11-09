const express = require('express');
const router = express.Router();

const path = require("path");
const FileUtils = require("../../utilities/file");

const files = new FileUtils();

router.get('/', function(req, res) {
  res.render("index", { 
    title: "pOS Node Script - Getting Started"
  });
});


router.get("/graphql", async (req, res) => {
  const query_path = path.join(__dirname, "../../../", "app", "graphql");
  const graphqlTree = await files.convertDirectoryToTree(query_path);

  res.render("graphql", { 
    title: "pOS Node Script - GraphQL",
    graphql: graphqlTree
  });
});


router.get("/graphql-tree", async (req, res) => {
  const query_path = path.join(__dirname, "../../../", "app", "graphql");
  const graphqlTree = await files.convertDirectoryToTree(query_path);

  res.send(graphqlTree);
});

module.exports = router;
