const express = require('express');
const path = require('path');

const builtin = [
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(__dirname, 'public'))
];

module.exports = builtin;
