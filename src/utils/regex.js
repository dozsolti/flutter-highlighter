const r = require('ts-regex-builder');
const { WIDGET_CATALOG } = require('../widgets');

const prefixes = [
    r.choiceOf(
        [
            r.oneOrMore(r.whitespace),
            r.optional('const'),
            r.oneOrMore(r.whitespace),
        ],
        r.oneOrMore(r.whitespace),
    )
];

function generateRegex({ excludes, includes }) {

    const widgets = Object.keys(WIDGET_CATALOG)
        .filter(k => (excludes || []).indexOf(k) == -1)
        .concat(Object.keys(includes || {}));

    return r.buildRegExp(
        [
            ...prefixes,
            r.choiceOf(...widgets),
            r.zeroOrMore(r.whitespace),
            '(',
        ], {
        global: true,
        ignoreCase: true,
    });
}

function generatePropertyRegex(propertyName) {
    return r.buildRegExp(
        [
            propertyName,
            r.zeroOrMore(r.whitespace),
            ':',
            r.zeroOrMore(r.whitespace),
            r.optional(["<", r.oneOrMore(r.word), ">"])
        ]
    );

}

module.exports = {
    generateRegex,
    generatePropertyRegex,
}
