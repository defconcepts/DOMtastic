/*
 * @module Util
 */

/*
 * Reference to the global scope
 * @private
 */

const global = new Function("return this")();

/**
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 * @private
 */

function toArray(collection) {
    let length = collection.length,
        result = new Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = collection[i];
    }
    return result;
}

/**
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @return {Node|NodeList|Array}
 * @private
 */

function each(collection, callback, thisArg) {
    let length = collection.length;
    if (length !== undefined && collection.nodeType === undefined) {
        for (let i = 0; i < length; i++){
            callback.call(thisArg, collection[i], i, collection);
        }
    } else {
        callback.call(thisArg, collection, 0, collection);
    }
    return collection;
}

/**
 * Assign enumerable properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} target Object to extend
 * @param {Object} [source] Object to extend from
 * @return {Object} Extended object
 * @example
 *     $.extend({a: 1}, {b: 2});
 *     // {a: 1, b: 2}
 * @example
 *     $.extend({a: 1}, {b: 2}, {a: 3});
 *     // {a: 3, b: 2}
 */

function extend(target, ...sources) {
    sources.forEach(src => {
        for (let prop in src) {
            target[prop] = src[prop];
        }
    });
    return target;
}

/**
 * Return the collection without duplicates
 *
 * @param collection Collection to remove duplicates from
 * @return {Node|NodeList|Array}
 * @private
 */

const uniq = collection => collection.filter((item, index) => collection.indexOf(item) === index);

/*
 * Export interface
 */

export { global, toArray, each, extend, uniq };
