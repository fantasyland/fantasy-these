'use strict';

const λ = require('fantasy-check/src/adapters/nodeunit');
const functor = require('fantasy-check/src/laws/functor');
const {identity} = require('fantasy-combinators');
    
const Identity = require('fantasy-identities');
const These = require('../fantasy-these');

exports.these = {

    // Functor tests
    'All (Functor)': functor.laws(λ)(These.of, identity),
    'Identity (Functor)': functor.identity(λ)(These.of, identity),
    'Composition (Functor)': functor.composition(λ)(These.of, identity)
};
