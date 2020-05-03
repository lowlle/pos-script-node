"use strict";

const express = require("express");
const router = express.Router();

const path = require("path");
const {renderSass} = require("../../utilities/compile_sass");

const cssConfig = require("../config/css.json")

cssConfig.sassFilesToCompile.forEach((sassFile) => {
    const cssFile = sassFile.replace(/\.{1}.*/, ".css");
    router.get(`/${cssFile}`, async (req, res) => {
      const sassFilePath = path.join(__dirname, "../public/styles/sass/", sassFile);

      try {
        const css = await renderSass(sassFilePath);
        res.contentType("text/css");
        console.log(`Successfully Exported ${cssFile}`);
        res.send(css);
      } catch (error) {
        res.status(500).send(error);
      }
    });
});

module.exports = router;
