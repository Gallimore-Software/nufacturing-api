"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const mongoose = require("mongoose");
const { transports, format } = require("winston");
const logger = require("./loggerConfig");
require("dotenv").config();
// Connect to MongoDB and add MongoDB transport
const connectDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      console.log(process.env.DB_URI);
      // Connect to MongoDB
      yield mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // Add MongoDB transport for logging
      logger.add(
        new transports.MongoDB({
          db: process.env.DB_URI,
          collection: "logs",
          level: "info",
          options: { useUnifiedTopology: true },
          format: format.combine(format.timestamp(), format.json()),
        }),
      );
      logger.info("Connected to MongoDB for logging.");
      console.log("Connected to MongoDB");
    } catch (err) {
      logger.error("Could not connect to MongoDB for logging", err);
      console.error("Could not connect to MongoDB", err);
      process.exit(1); // Exit the process if there is a connection error
    }
  });
module.exports = connectDB;
//# sourceMappingURL=db.js.map
