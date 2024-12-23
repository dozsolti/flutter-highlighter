function _findClosingParen(text, openPos, parentheses = "()") {
    let closePos = openPos;
    let counter = 1;
    while (text[closePos] != parentheses[0] && closePos < text.length) {
        if (text[closePos] === ',')
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

function findClosing(s, startIndex, propertyRegex, parentheses) {
    const endIndex = _findClosingParen(s, startIndex);

    const m = s.substring(startIndex).match(propertyRegex);

    let propertyStartIndex = startIndex;
    if (m) {
        // console.log(m);

        propertyStartIndex = startIndex +
            m.index +
            m[0].length;
    }

    const propertyEndIndex = _findClosingParen(s, propertyStartIndex, parentheses);

    // The widget ended but didn't had the propertyName
    if (endIndex < propertyStartIndex)
        return [{ startIndex, endIndex: endIndex }];

    return [
        { startIndex, endIndex: propertyStartIndex },
        // { startIndex: propertyStartIndex, endIndex: propertyEndIndex },
        { startIndex: propertyEndIndex, endIndex },
    ];


}

module.exports = {
    findClosing
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