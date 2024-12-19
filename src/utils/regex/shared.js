const r = require('ts-regex-builder');


const FLAGS = {
    global: true,
    ignoreCase: true,
    dotAll: true
}

const prefixes = [
    r.optional('const'),
    /\s+/,
];

module.exports = { prefixes, FLAGS }