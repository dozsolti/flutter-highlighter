const { prefixes, FLAGS } = require('./shared');

const r = require('ts-regex-builder');

function select(widgetName, rgxParameter) {
    return r.buildRegExp([
        ...prefixes,
        widgetName,
        '(',
        rgxParameter,
    ], FLAGS);
}

function selectWithChild(widgetName) {
    return r.buildRegExp([
        select(widgetName, /.+?(?=child)child/),
        ':',
    ], FLAGS);
}
function selectWithChildren(widgetName) {
    return r.buildRegExp([
        select(widgetName, /.+?(?=children)children/),
        ':',
        /\s*/,
        r.optional("<Widget>"),
        r.optional(/\s*\[/),
    ], FLAGS);
}

module.exports = { select, selectWithChild, selectWithChildren }