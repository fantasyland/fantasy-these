var λ           = require('fantasy-check/src/adapters/nodeunit'),
    functor     = require('fantasy-check/src/laws/functor'),
    combinators = require('fantasy-combinators'),
    
    Identity  = require('fantasy-identities'),
    These = require('../fantasy-these'),

    identity = combinators.identity;

exports.these = {

    // Functor tests
    'All (Functor)': functor.laws(λ)(These.of, identity),
    'Identity (Functor)': functor.identity(λ)(These.of, identity),
    'Composition (Functor)': functor.composition(λ)(These.of, identity)
};
