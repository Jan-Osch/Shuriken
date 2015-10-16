//     Shuriken
//     MIT license.

/**
 * Assigns value of nested of source to destination.
 * Even if the nested value evaluates to false it will be assigned to the destination
 * If alternative value is provided it will be assigned to the destination.
 *
 * @param destination
 * @param source {Object}
 * @param keys {Array / String} can be either an Array of Strings, or '.' separated String.
 * @param alternative {=} value that will be assigned to destination if nested field does not exist
 */
function bindNested(destination, source, keys, alternative) {
    var previous = source || alternative;
    if (keys instanceof String) {
        keys = keys.split('.')
    }
    for (var i = 0; i < keys.length; i++) {
        if (!previous.hasOwnProperty(keys[i])) {
            if (alternative) {
                destination = alternative;
            }
            return;
        }
        previous = previous[keys[i]];
    }
    destination = previous;
}

/**
 *  Returns true if object has a nested property under keys, False otherwise
 *
 * @param source {Object}
 * @param keys {Array / String} can be either an Array of Strings, or '.' separated String.
 */
function hasNested(source, keys) {
    var previous = source || {};
    if (keys instanceof String) {
        keys = keys.split('.')
    }
    for (var i = 0; i < keys.length; i++) {
        if (!previous.hasOwnProperty(keys[i])) {
            return false;
        }
        previous = previous[keys[i]];
    }
    return true;
}

module.exports = {
    bindNested : bindNested
};