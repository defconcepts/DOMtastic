define("api", 
  ["attr","class","dom","event","html","selector","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __exports__) {
    "use strict";
    /*
     * # API
     *
     * Import modules to build the API.
     *
     * The special comments (e.g. `API:class`) are used to exclude modules for a custom build.
     */

    var api = {};

    /* API:attr */
    var attr = __dependency1__.attr;
    api.attr = attr;
    /* API:attr */

    /* API:class */
    var addClass = __dependency2__.addClass;
    var removeClass = __dependency2__.removeClass;
    var toggleClass = __dependency2__.toggleClass;
    var hasClass = __dependency2__.hasClass;
    api.addClass = addClass;
    api.removeClass = removeClass;
    api.toggleClass = toggleClass;
    api.hasClass = hasClass;
    /* API:class */

    /* API:dom */
    var append = __dependency3__.append;
    var before = __dependency3__.before;
    var after = __dependency3__.after;
    api.append = append;
    api.before = before;
    api.after = after;
    /* API:dom */

    /* API:event */
    var on = __dependency4__.on;
    var off = __dependency4__.off;
    var delegate = __dependency4__.delegate;
    var undelegate = __dependency4__.undelegate;
    var trigger = __dependency4__.trigger;
    api.on = on;
    api.off = off;
    api.delegate = delegate;
    api.undelegate = undelegate;
    api.trigger = trigger;
    /* API:event */

    /* API:html */
    var html = __dependency5__.html;
    api.html = html;
    /* API:html */

    /* API:selector */
    var $ = __dependency6__.$;
    var find = __dependency6__.find;
    api.$ = find;
    api.find = find;
    $._api = api;
    /* API:selector */

    var array = [];

    /*
     * The `apiNodeList` object represents the API that gets augmented onto the native `NodeList` object.
     * The wrapped array (native `Array`) already has these (and more).
     */

    var apiNodeList = {
        every: array.every,
        filter: array.filter,
        forEach: array.forEach,
        each: array.forEach,
        some: array.some,
        map: array.map
    };

    // Export interface

    __exports__.$ = $;
    __exports__.api = api;
    __exports__.apiNodeList = apiNodeList;
  });
define("attr", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // # Attr

    /**
     * ## attr
     *
     *     $('.item').attr('attrName');
     *     $('.item').attr('attrName', 'attrValue');
     *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
     */

    var attr = function(key, value) {

        if(typeof key === 'string' && typeof value === 'undefined') {
            return (this.nodeType ? this : this[0]).getAttribute(key);
        }

        (this.nodeType ? [this] : this).forEach(function(element) {
            if(typeof key === 'object') {
                for(var attr in key) {
                    element.setAttribute(attr, key[attr]);
                }
            } else {
                element.setAttribute(key, value);
            }
        });

        return this;
    };

    // Export interface

    __exports__.attr = attr;
  });
define("class", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // # Class methods

    /**
     * ## addClass
     *
     *     $('.item').addClass('bar');
     *
     * @param {string} value The class name to add to the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var addClass = function(value) {
        (this.nodeType ? [this] : this).forEach(function(element) {
            element.classList.add(value);
        });
        return this;
    };

    /**
     * ## removeClass
     *
     *     $('.items').removeClass('bar');
     *
     * @param {string} value The class name to remove from the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var removeClass = function(value) {
        (this.nodeType ? [this] : this).forEach(function(element) {
            element.classList.remove(value);
        });
        return this;
    };

    /**
     * ## toggleClass
     *
     *     $('.item').toggleClass('bar');
     *
     * @param {string} value The class name to toggle at the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var toggleClass = function(value) {
        (this.nodeType ? [this] : this).forEach(function(element) {
            element.classList.toggle(value);
        });
        return this;
    };

    /**
     * ## hasClass
     *
     *     $('.item').hasClass('bar');
     *
     * @param {string} value Check if the DOM element contains the class name. When applied to multiple elements,
     * returns `true` if _any_ of them contains the class name.
     * @return {boolean}
     */

    var hasClass = function(value) {
        return (this.nodeType ? [this] : this).some(function(element) {
            return element.classList.contains(value);
        });
    };

    // Export interface

    __exports__.addClass = addClass;
    __exports__.removeClass = removeClass;
    __exports__.toggleClass = toggleClass;
    __exports__.hasClass = hasClass;
  });
define("dom", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // # DOM Manipulation

    /**
     * ## append
     *
     *     $('.item').append('<p>more</p>');
     *
     * @param {String|Node|NodeList|$Object} element What to append to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var append = function(element) {
        if(this instanceof Node) {
            if(typeof element === 'string') {
                this.insertAdjacentHTML('beforeend', element);
            } else {
                if(element instanceof Node) {
                    this.appendChild(element);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.forEach(this.appendChild.bind(this));
                }
            }
        } else {
            var l = this.length;
            while(l--) {
                var elm = l === 0 ? element : clone(element);
                append.call(this[l], elm);
            }
        }
        return this;
    };

    /**
     * ## before
     *
     *     $('.items').before('<p>prefix</p>');
     *
     * @param {String|Node|NodeList|$Object} element What to place as sibling(s) before to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var before = function(element) {
        if(this instanceof Node) {
            if(typeof element === 'string') {
                this.insertAdjacentHTML('beforebegin', element);
            } else {
                if(element instanceof Node) {
                    this.parentNode.insertBefore(element, this);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.forEach(before.bind(this));
                }
            }
        } else {
            var l = this.length;
            while(l--) {
                var elm = l === 0 ? element : clone(element);
                before.call(this[l], elm);
            }
        }
        return this;
    };

    /**
     * ## after
     *
     *     $('.items').after('<span>suf</span><span>fix</span>');
     *
     * @param {String|Node|NodeList|$Object} element What to place as sibling(s) after to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var after = function(element) {
        if(this instanceof Node) {
            if(typeof element === 'string') {
                this.insertAdjacentHTML('afterend', element);
            } else {
                if(element instanceof Node) {
                    this.parentNode.insertBefore(element, this.nextSibling);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.reverse().forEach(after.bind(this));
                }
            }
        } else {
            var l = this.length;
            while(l--) {
                var elm = l === 0 ? element : clone(element);
                after.call(this[l], elm);
            }
        }
        return this;
    };

    /**
     * @method clone
     * @private
     * @param {String|Node|NodeList|Array} element The element(s) to clone.
     * @return {String|Node|NodeList|Array} The cloned element(s)
     */

    var clone = function(element) {
        if(typeof element === 'string') {
            return '' + element;
        } else if(element instanceof Node) {
            return element.cloneNode(true);
        } else if(element.length) {
            return [].map.call(element, function(el) {
                return el.cloneNode(true);
            });
        }
        return element;
    };

    /**
     * @method toArray
     * @private
     * @param {NodeList|Array} collection
     * @return {Array}
     */

    var toArray = function(collection) {
        return [].slice.call(collection);
    };

    // Export interface

    __exports__.append = append;
    __exports__.before = before;
    __exports__.after = after;
  });
define("event", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // # Events

    /**
     * ## on
     *
     * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
     *
     *     $('.item').on('click', callback);
     *     $('.container').on('click', '.item', handler);
     *
     * @param {String} eventName
     * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var on = function(eventName, selector, handler, useCapture) {

        if(typeof selector === 'function') {
            handler = selector;
            selector = null;
        }

        var parts = eventName.split('.');
        eventName = parts[0] || null;
        var namespace = parts[1] || null;

        var eventListener = handler;

        (this.nodeType ? [this] : this).forEach(function(element) {

            if(selector) {
                eventListener = delegateHandler.bind(element, selector, handler);
            }

            element.addEventListener(eventName, eventListener, useCapture || false);

            getHandlers(element).push({
                eventName: eventName,
                handler: handler,
                eventListener: eventListener,
                selector: selector,
                namespace: namespace
            });
        });

        return this;
    };

    /**
     * ## off
     *
     * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
     *
     *     $('.item').off('click', callback);
     *
     * @param {String} eventName Name or type of the event
     * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var off = function(eventName, selector, handler, useCapture) {

        if(typeof selector === 'function') {
            handler = selector;
            selector = null;
        }

        if(eventName) {
            var parts = eventName.split('.');
            eventName = parts[0];
            var namespace = parts[1];
        }

        (this.nodeType ? [this] : this).forEach(function(element) {

            var handlers = getHandlers(element) || [];

            if(!eventName && !namespace && !selector && !handler) {

                handlers.forEach(function(item) {
                    element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
                });

                clearHandlers(element);

            } else {

                handlers.filter(function(item) {
                    return ((!eventName || item.eventName === eventName) &&
                        (!namespace || item.namespace === namespace) &&
                        (!handler || item.handler === handler) &&
                        (!selector || item.selector === selector));
                }).forEach(function(item) {
                    element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
                    handlers.splice(handlers.indexOf(item), 1);
                });

                if(handlers.length === 0) {
                    clearHandlers(element);
                }
            }

        });

        return this;
    };

    /**
     * ## delegate
     *
     * Delegate events triggered at descendants to element(s)
     *
     *     $('.container').delegate('.item', 'click', handler);
     *
     * @param {String} selector Selector to filter descendants that delegate the event to this element.
     * @param {String} eventName Name or type of the event
     * @param {Function} fn Event handler
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var delegate = function(selector, eventName, fn) {
        return on.call(this, eventName, selector, fn);
    };

    /**
     * ## undelegate
     *
     * Undelegate events triggered at descendants to element(s)
     *
     *     $('.container').undelegate('.item', 'click', handler);
     *
     * @param {String} selector Selector to filter descendants that undelegate the event to this element.
     * @param {String} eventName Name or type of the event
     * @param {Function} fn Event handler
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var undelegate = function(selector, eventName, fn) {
        return off.call(this, eventName, selector, fn);
    };

    /**
     * ## trigger
     *
     * Trigger event at element(s)
     *
     *     $('.item').trigger('anyEventType');
     *
     * @param {String} type Type of the event
     * @param {Object} [params] Event parameters (optional)
     * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
     * @param {Boolean} params.cancelable=true Is the event cancelable or not.
     * @param {Mixed} params.detail=undefined Additional information about the event.
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var trigger = function(type, params) {
        params = params || { bubbles: true, cancelable: true, detail: undefined };
        var event = new CustomEvent(type, params);
        (this.nodeType ? [this] : this).forEach(function(element) {
            if(!params.bubbles || element === window || isEventBubblingInDetachedTree || document.contains(element)) {
                element.dispatchEvent(event);
            } else {
                triggerForPath(element, type, params);
            }
        });
        return this;
    };

    /**
     * Dispatch the event at the element and its ancestors.
     * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
     *
     * @param {Node} element First element to dispatch the event
     * @param {String} type Type of the event
     * @param {Object} [params] Event parameters (optional)
     * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
     * Will be set to false (but shouldn't matter since events don't bubble anyway).
     * @param {Boolean} params.cancelable=true Is the event cancelable or not.
     * @param {Mixed} params.detail=undefined Additional information about the event.
     */

    var triggerForPath = function(element, type, params) {
        params = params || {};
        params.bubbles = false;
        var event = new CustomEvent(type, params);
        event._target = element;
        while(element.parentNode) {
            element.dispatchEvent(event);
            element = element.parentNode;
        }
    };

    /**
     * Get event handlers from an element
     *
     * @method getHandlers
     * @private
     * @param {Node} element
     * @return {Array}
     */

    var cacheKeyProp = '_jeh';
    var id = 1;
    var handlers = {};
    var unusedKeys = [];

    var getHandlers = function(element) {
        if(!element[cacheKeyProp]) {
            element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
        }
        var key = element[cacheKeyProp];
        return handlers[key] || (handlers[key] = []);
    }

    /**
     * Clear event handlers for an element
     *
     * @method clearHandlers
     * @private
     * @param {Node} element
     */

    var clearHandlers = function(element) {
        var key = element[cacheKeyProp];
        if(handlers[key]) {
            handlers[key] = null;
            element[key] = null;
            unusedKeys.push(key);
        }
    };

    /**
     * Function to test whether delegated events match the provided `selector` (filter),
     * and then actually call the provided event handler.
     * Also sets `event.currentTarget` on the event object.
     *
     * @method delegateHandler
     * @private
     * @param {String} selector Selector to filter descendants that undelegate the event to this element.
     * @param {Function} fn Event handler
     * @param {Event} event
     */

    var delegateHandler = function(selector, handler, event) {
        var eventTarget = event._target || event.target;
        if(matchesSelector.call(eventTarget, selector)) {
            if(!event.currentTarget) {
                event.currentTarget = eventTarget;
            }
            handler.call(eventTarget, event);
        }
    };

    // Get the available `matches` or `matchesSelector` method.

    var matchesSelector = function() {
        return this.matches || this.matchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.msMatchesSelector || this.oMatchesSelector;
    }.call(Element.prototype);

    /**
     * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
     * Needed to support IE (9, 10, 11)
     */

    (function() {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.CustomEvent.prototype;
        window.CustomEvent = CustomEvent;
    })();

    // Are events bubbling in detached DOM trees?

    var isEventBubblingInDetachedTree = function() {
        var isBubbling = false,
            parent = document.createElement('div'),
            child = parent.cloneNode();
        parent.appendChild(child);
        parent.addEventListener('e', function() {
            isBubbling = true;
        });
        child.dispatchEvent(new CustomEvent('e', {bubbles:true}));
        return isBubbling;
    }();

    // Export interface

    __exports__.on = on;
    __exports__.off = off;
    __exports__.delegate = delegate;
    __exports__.undelegate = undelegate;
    __exports__.trigger = trigger;
  });
define("html", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // # HTML

    /*
     * ## html
     *
     *     $('.item').html();
     *     $('.item').html('<span>more</span>');
     *
     * @param {String} [fragment] HTML fragment to set for the element
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var html = function(fragment) {

        if(!fragment) {
            return (this.nodeType ? this : this[0]).innerHTML;
        }

        (this.nodeType ? [this] : this).forEach(function(element) {
            element.innerHTML = fragment;
        });
        return this;

    };

    // Export interface

    __exports__.html = html;
  });
define("main", 
  ["api","mode","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /**
     *
     * # jQuery Evergreen
     *
     * jQuery Evergreen works with modern browsers.
     * It has the same familiar API as jQuery, and is lean & mean with the following, optional modules:
     * [selector](selector.html), [class](class.html), [DOM](dom.html), [event](event.html), [attr](attr.html) and [html](html.html).
     *
     * The complete version is under 7KB after minification (2KB gzipped).
     *
     * Much of the original jQuery's "weight" is not included at all, such as `$.ajax`, `$.animate`, and `$.Deferred`.
     *
     * Browser support: latest version of Chrome, Firefox, Safari, Opera, Chrome Mobile iOS, and Mobile Safari. IE10 and IE11.
     * IE9 only needs a polyfill for `classList` to make all tests pass.
     *
     * You can opt-in to work directly with [Node and live NodeList](mode.html) objects.
     *
     * You can easily create **custom builds** to exclude parts you don't need:
     *
     *     $ grunt --exclude=attr,class,dom,event,html,selector
     *
     * Using **AMD**, just include it as a regular dependency:
     *
     *     define(['jquery-evergreen'], function($) {
     *
     *     });
     *
     * The sources are written in the **ES6** Modules format,
     * and transpiled to an AMD version, and a "browser global" version
     * using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/).
     *
     */

    var $ = __dependency1__.$;

    __exports__["default"] = $;
  });
define("mode", 
  ["api","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /*
     * # Opt-in to Native Mode
     *
     * The default, non-intrusive mode is similar to how jQuery operates: working with static, array-like `$` objects:
     *
     *     $('.items').append('<span>foo</span>);
     *     $(document.body).on('click', '.tab', handler);
     *
     * However, you can opt-in to work with live NodeList objects.
     * In this "native" mode, the `Node` and `NodeList` prototypes are augmented (in a safe and reversible manner) to fill up the chainable API,
     * to enable working with `Node` and `NodeList` objects directly:
     *
     *     var collection = document.querySelectorAll('.items');
     *     collection.append('<span>foo</span>);
     *     collection.addClass('bar');
     *     collection.forEach(iteratorFn);
     *     collection.find('.more');
     *
     *     document.body.on('click', '.tab', handler)
     *
     * Note that in native mode, `$(selector)` can stil be used. It returns a NodeList.
     *
     * Use `$.native()` to activate this behavior. The API is the same in both modes.
     */

    var $ = __dependency1__.$;
    var api = __dependency1__.api;
    var apiNodeList = __dependency1__.apiNodeList;

    var isNative = false;

    var native = function(native) {
        var wasNative = isNative;
        isNative = typeof native === 'boolean' ? native : true;
        if($) {
            $.isNative = isNative;
        }
        if(!wasNative && isNative) {
            augmentNativePrototypes();
        }
        if(wasNative && !isNative) {
            unaugmentNativePrototypes();
        }
        return isNative;
    };

    var NodeProto = Node.prototype,
        NodeListProto = NodeList.prototype;

    /*
     * Add a property (i.e. method) to an object in a safe and reversible manner.
     * Only add the method if object not already had it (non-inherited).
     */

    var augment = function(obj, key, value) {
        if(!obj.hasOwnProperty(key)) {
            Object.defineProperty(obj, key, {
                value: value,
                configurable: true,
                enumerable: false
            });
        }
    };

    /*
     * Remove property from object (only inherited properties will be removed).
     */

    var unaugment = function(obj, key) {
        delete obj[key];
    };

    /*
     * Augment native `Node` and `NodeList` objects in native mode.
     */

    var augmentNativePrototypes = function() {

        var key;

        for(key in api) {
            augment(NodeProto, key, api[key]);
            augment(NodeListProto, key, api[key]);
        }

        for(key in apiNodeList) {
            augment(NodeListProto, key, apiNodeList[key]);
        }
    };

    /*
     * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
     * Mainly used for tests.
     */

    var unaugmentNativePrototypes = function() {

        var key;

        for(key in api) {
            unaugment(NodeProto, key);
            unaugment(NodeListProto, key);
        }

        for(key in apiNodeList) {
            unaugment(NodeListProto, key);
        }
    };

    /*
     * It's possible to have a custom build without the [selector](selector.html) API,
     * but in that case only the native mode makes sense.
     */

    if(typeof $ === 'undefined') {
        native();
    } else {
        $.isNative = isNative;
        $.native = native;
    }

    // Export interface

    __exports__.isNative = isNative;
    __exports__.native = native;
  });
define("selector", 
  ["exports"],
  function(__exports__) {
    "use strict";
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
     * @param {String|Node|NodeList} context=`document` The context for the selector to query elements.
     * @return {NodeList|$Object}
     */

    var $ = function(selector, context) {

        var collection;

        if(!selector) {

            collection = document.querySelectorAll(null);

        } else if(typeof selector !== 'string') {

            collection = selector.length ? selector : [selector];

        } else if(/^\s*<(\w+|!)[^>]*>/.test(selector)) {

            collection = createFragment(selector);

        } else {

            context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

            collection = context.querySelectorAll(selector);

        }

        return $.isNative ? collection : wrap(collection);

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
     * Calling `$(selector)` returns a wrapped array of elements [by default](mode.html).
     *
     * @method wrap
     * @private
     * @param {NodeList|Node|Array} collection Element(s) to wrap as a `$Object`.
     * @return {$Object} Array with augmented API.
     */

    var wrap = function(collection) {
        var wrapped = collection instanceof NodeList ? [].slice.call(collection) : collection instanceof Array ? collection : [collection];
        for(var key in $._api) {
            wrapped[key] = $._api[key];
        }
        return wrapped;
    };

    // Export interface

    __exports__.$ = $;
    __exports__.find = find;
  });define("jquery-evergreen", ["main"], function(main) { return main["default"];});