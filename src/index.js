"use strict";

/**
 * Returns the value of a nested property of source object if it exists.
 * Even if the nested property evaluates to false it will be returned.
 * If the nested property does not exist, undefined will be returned.
 * @param {Object} source       source object
 * @param {String} path         path without first dot e.g. "response.http.statusCode"
 * @param {String=} sourceName  if provided, any catched error will be logged to console
 * @returns {*}                 value under the source.path or undefined
 */
function reach(source, path, sourceName) {
    var result;
    try {
        if (sourceName) {
            eval('var ' + sourceName + '=source; result=' + sourceName + '.' + path);
        } else {
            eval('result=source.' + path);
        }
    } catch (err) {
        if (sourceName) {
            console.log(err);
        }
    }
    return result;
}

module.exports = reach;