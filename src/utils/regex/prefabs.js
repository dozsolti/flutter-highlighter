const { selectWithChild } = require('./utils');
const { FLAGS, prefixes } = require('./shared');

const r = require('ts-regex-builder');

const paranthesesOrChild = /.+?(?:(?=\))\)\s*,?|(?=child)child)/;

const regexSizedBox = r.buildRegExp(
    [
        ...prefixes,
        "SizedBox",
        r.zeroOrMore(' '),
        '(',
        paranthesesOrChild,
        r.optional([':'])
    ], FLAGS)


module.exports = { regexSizedBox };