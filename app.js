var express = require('express');
var path = require('path');

var bootstrap  = require("./bootstrap");
var app = bootstrap.Launcher();

app.set('views', path.join(__dirname, 'views'));