var combinators = require('fantasy-combinators'),
    daggy = require('daggy'),

    Option = require('fantasy-options'),

    compose = combinators.compose,

    These = daggy.taggedSum({
        This: ['x'],
        That: ['x'],
        Both: ['x', 'y']
    });

These.of = function(x) {
    return These.That(x);
};

These.prototype.map = function(f) {
    return this.cata({
        This: function(x) {
            return These.This(x);
        },
        That: function(x) {
            return These.That(f(x));
        },
        Both: function(x, y) {
            return These.Both(x, f(y));
        }
    });
};

These.prototype.bimap = function(f, g) {
    return this.cata({
        This: function(x) {
            return These.This(f(x));
        },
        That: function(x) {
            return These.That(g(x));
        },
        Both: function(x, y) {
            return These.Both(f(x), g(y));
        }
    });
};

These.prototype.left = function() {
    return this.cata({
        This: function(x) {
            return Option.Some(x);
        },
        That: function(x) {
            return Option.None;
        },
        Both: function(x, y) {
            return Option.Some(x);
        }
    });
};

These.prototype.right = function() {
    return this.cata({
        This: function(x) {
            return Option.Nothing;
        },
        That: function(x) {
            return Option.Some(x);
        },
        Both: function(x, y) {
            return Option.Some(y);
        }
    });
};

These.thisOrBoth = function(x, y) {
    return y.cata({
        Some: function(a) {
            return These.Both(x, a);
        },
        Nothing: function() {
            return These.This(x);
        }
    });
};

These.thatOrBoth = function(x, y) {
    return y.cata({
        Some: function(a) {
            return These.Both(x, a);
        },
        Nothing: function() {
            return These.That(x);
        }
    });
};

if (typeof module != 'undefined')
  module.exports = These;