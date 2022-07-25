/** Required Packages
 **************************************************************************************************/
const fs = require("fs");

/** Global Constants
 **************************************************************************************************/
//const fileName = "README.md";

/** Function Definitions
 **************************************************************************************************/
const writeToFile = (fileName, data) => {
  // resolve - if the promise is fullfilled
  // reject - if promise is not fullfilled
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      //if there is an error, reject the Promise and send the error to the promise's `.catch()` method
      if (err) {
        reject(err);
        // return out of the function here to make sure hte Promise doesn't acceidentally execute the resolve() function as well
        return;
      }

      // if it went well , resove the Promise and send the successfull data to the `then()` method
      resolve({
        ok: true,
        message: "File Created",
      });
    });
  });
};

/** Modules Export
 **************************************************************************************************/
module.exports = {
  writeToFile,
};
