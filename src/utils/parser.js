const { generatePropertyRegex } = require('./regex');
const { WIDGET_CATALOG } = require('../widgets');

function _findClosingParen(text, openPos, parentheses = "()", stopAtComma = true) {
    let closePos = openPos;
    let counter = 1;
    while (text[closePos] != parentheses[0] && closePos < text.length) {
        if (stopAtComma && text[closePos] === ',')
            return closePos + 1;
        closePos++
    };
    while (counter > 0 && closePos < text.length) {
        let c = text[++closePos]
        if (c == parentheses[0]) {
            counter++;
        } else if (c == parentheses[1]) {
            counter--;
        }
    }

    return closePos + 1;
}

function findClosingMulti(s, startIndex, properties) {

    const endIndex = _findClosingParen(s, startIndex);

    let text = s.substring(startIndex, endIndex);

    let matches = properties
        .map(property => {
            const propertyRegex = generatePropertyRegex(property.name);

            const defaultParentheses = property.name == 'children' ? '[]' : '()';
            return {
                type: property.type,
                parentheses: property.wrapper || defaultParentheses,
                match: text.match(propertyRegex)
            }
        })
        .filter(p => p.match != null)

    if (matches.length == 0) {
        console.log("No matches.");
        return [{ startIndex, endIndex: endIndex }];
    }

    matches.sort((a, b) => a.match.index - b.match.index);

    let fadeList = [];

    for (let i = 0; i < matches.length; i++) {
        let { match, parentheses, type } = matches[i];

        const propertyStartIndex = startIndex + match.index + match[0].length;

        if (type == "function") {
            const parametersEndIndex = _findClosingParen(s, propertyStartIndex, "()", false);

            const functionBodyStartIndex = parametersEndIndex;
            const propertyEndIndex = _findClosingParen(s, functionBodyStartIndex, "{}");

            fadeList.push({
                startIndex: i == 0 ? startIndex : fadeList[fadeList.length - 1].propertyEndIndex,
                endIndex: propertyStartIndex,
                propertyEndIndex
            })

        } else {
            const propertyEndIndex = _findClosingParen(s, propertyStartIndex, parentheses);

            // match.input = "<long text>";
            // console.log(match, propertyEndIndex);

            fadeList.push({
                startIndex: i == 0 ? startIndex : fadeList[fadeList.length - 1].propertyEndIndex,
                endIndex: propertyStartIndex,
                propertyEndIndex
            })
        }

    }
    if (fadeList.length > 0)
        fadeList.push({
            startIndex: fadeList[fadeList.length - 1].propertyEndIndex,
            endIndex,
        })

    return fadeList;
}

function parseMatch(match, includedWidgets = {}) {

    const widgetName = match[0]
        .trim()
        .replace(/const\s+/, '')
        .replace(/[^a-z_\.]/gi, '');

    if (!(widgetName in WIDGET_CATALOG || widgetName in includedWidgets)) {
        console.error(`Error: Widget '${widgetName}' not configured.`);
        return [];
    }
    const widget = WIDGET_CATALOG[widgetName] || includedWidgets[widgetName];

    return findClosingMulti(
        match.input, match.index, widget.properties
    );

}

module.exports = {
    parseMatch
}

/*

Maybe usefull regex:

const paranthesesOrChild = /.+?(?:(?=\))\)\s*,?|(?=child)child)/;
const paranthesesPair = ['(',
    r.oneOrMore(
        r.choiceOf( /[^()]/, /\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/)
    ),
    ')'];


    
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
    */