'use strict';

const daggy = require('daggy');

const {compose, identity} = require('fantasy-combinators');
const Option = require('fantasy-options');

const These = daggy.taggedSum({
    This: ['x'],
    That: ['x'],
    Both: ['x', 'y']
});

These.of = These.That;

These.prototype.map = function(f) {
    return this.bimap(identity, f);
};

These.prototype.bimap = function(f, g) {
    return this.cata({
        This: (x) => These.This(f(x)),
        That: (x) => These.That(g(x)),
        Both: (x, y) => These.Both(f(x), g(y))
    });
};

These.prototype.left = function() {
    return this.cata({
        This: (x) => Option.Some(x),
        That: (x) => Option.None,
        Both: (x, y) => Option.Some(x)
    });
};

These.prototype.right = function() {
    return this.cata({
        This: (x) => Option.None,
        That: (x) => Option.Some(x),
        Both: (x, y) => Option.Some(y)
    });
};

These.thisOrBoth = function(x, y) {
    return y.cata({
        Some: (a) => These.Both(x, a),
        Nothing: () => These.This(x)
    });
};

These.thatOrBoth = function(x, y) {
    return y.cata({
        Some: (a) => These.Both(x, a),
        Nothing: () => These.That(x)
    });
};

if (typeof module != 'undefined')
  module.exports = These;
