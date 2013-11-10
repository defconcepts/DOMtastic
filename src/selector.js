/*
 * # Selector
 */

/*
 * ## $
 *
 * Versatile wrapper for `querySelectorAll`.
 *
 * @param {String|Node|NodeList} selector Query selector.
 * Providing a selector string gives the default behavior.
 * Providing a Node or NodeList will return a NodeList or $Object containing the same element(s).
 * Providing a string that looks like HTML (i.e. starts with a `<tag>`) results in an attempt to create a DOM Fragment from it.
 * @param {String|Node|NodeList} context The context for the selector to query elements (optional, default: `document`).
 * @return {NodeList|$Object}
 */

var $ = function(selector, context) {

    var list;

    if(!selector) {

        list = document.querySelectorAll(null);

    } else if(typeof selector !== 'string') {

        list = selector.length ? selector : [selector];

    } else if(/^\s*<(\w+|!)[^>]*>/.test(selector)) {

        list = createFragment(selector);

    } else {

        context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

        list = context.querySelectorAll(selector);

    }

    return $.isSafe ? wrap(list) : list;

};

/*
 * ## Find
 *
 * Chaining for the `$` wrapper (aliasing `find` for `$`).
 *
 *     $('.selectors).find('.deep').$('.deepest');
 */

var find = function(selector) {
    return $(selector, this);
};

/*
 * Create DOM fragment from an HTML string
 *
 * @method createFragment
 * @private
 * @param {String} html String representing HTML.
 * @return {NodeList}
 */

var createFragment = function(html) {

    var fragment = document.createDocumentFragment(),
        container = document.createElement('div');

    container.innerHTML = html.trim();

    while(container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment.childNodes;
};

/*
 * Calling `$(selector)` returns a wrapped array of elements in [safe mode](mode.html) (default).
 *
 * @method wrap
 * @private
 * @param {NodeList|Node|Array} list Element(s) to wrap as a `$Object`.
 * @return {$Object} Array with augmented API.
 */

var wrap = function(list) {
    var wrapped = list instanceof NodeList ? [].slice.call(list) : list instanceof Array ? list : [list];
    for(var key in $._api) {
        wrapped[key] = $._api[key];
    }
    return wrapped;
};

// Export interface

export { $, find };