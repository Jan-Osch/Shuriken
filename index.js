//     Shuriken
//     MIT license.

/**
 * Returns value of a nested property of source object if it exists.
 * Even if the nested property evaluates to false it will be returned.
 * If the nested property does not exist undefined will be returned.
 * If alternative value is provided it will returned if the nested property does not exits.
 *
 * @param source {Object}
 * @param keys {Array / String} can be either an Array of Strings, or '.' separated String.
 * @param alternative {=} value that will returned if nested property does not exist
 */
function getNested(source, keys, alternative) {
    var previous = source || alternative;
    if (typeof keys == 'string') {
        keys = keys.split('.');
    }
    for (var i = 0; i < keys.length; i++) {
        if (!previous.hasOwnProperty(keys[i])) {
            if (alternative) {
                return alternative;
            }
            return undefined;
        }
        previous = previous[keys[i]];
    }
    return previous;
}

/**
 *  Returns true if object has a nested property under keys, False otherwise
 *
 * @param source {Object}
 * @param keys {Array / String} can be either an Array of Strings, or '.' separated String.
 */
function hasNested(source, keys) {
    var previous = source || {};
    if (typeof keys == 'string') {
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
    getNested: getNested,
    hasNested: hasNested
};