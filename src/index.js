/**
 * @module API
 */

import { extend } from './util';

let api = {},
    $ = {};

// Import modules to build up the API

import * as array from './array';
import BaseClass from './baseClass';
import * as attr from './dom/attr';
import * as class_ from './dom/class';
import * as contains from './dom/contains';
import * as css from './css';
import * as data from './dom/data';
import * as dom from './dom/index';
import * as dom_extra from './dom/extra';
import * as event from './event/index';
import * as html from './dom/html';
import * as noconflict from './noconflict';
import * as ready from './event/ready';
import * as selector from './selector/index';
import * as closest from './selector/closest';
import * as selector_extra from './selector/extra';
import * as trigger from './event/trigger';
import * as type from './type';

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

extend($, contains, noconflict, type);
extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

// Version

$.version = '__VERSION__';

// Util

$.extend = extend;

// Provide base class to extend from

if(typeof BaseClass !== 'undefined') {
    $.BaseClass = BaseClass($.fn);
}

// Ugly interoperability hack, to prevent potential ES6 import issues

$.default = $;

// Export interface

export default $;
