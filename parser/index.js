const fs = require('fs');

const strComp = fs.readFileSync('./input.dart', { encoding: 'utf-8' });

function findClosingParen(text, openPos) {
    let closePos = openPos
    let counter = 1
    while (text[closePos] != "(") closePos++
    while (counter > 0) {
        let c = text[++closePos]
        if (c == "(") {
            counter++
        } else if (c == ")") {
            counter--
        }
    }

    return closePos + 1
}

const regex =
    /(Align|Padding|Center|Expanded|Container|ConstrainedBox|FittedBox|Material|SliverToBoxAdapter|SingleChildScrollView|Positioned|Column|Row|Stack|SizedBox)\s*\(/gi
/* function removeProperties(str, propertyName) {
    let m = str.match(new RegExp(propertyName + `\s*:\s*`))
    if (!m) return str;

    // console.log(m)

    let startIndex = m.index + m[0].length;

    let endIndex = findClosingParen(str, startIndex);
    return [
        str.substring(0, startIndex),
        str.substring(startIndex, endIndex),
        str.substring(endIndex),
    ]
} */


function removeProperties(str, fromIndex, propertyName) {
    const m = str.substring(fromIndex).match(new RegExp(propertyName + `\s*:\s*`))
    if (!m) return str;

    return str.substring(0, fromIndex + m.index + m[0].length);
}

function splitter(str) {
    const parts = []
    let match;

    while ((match = regex.exec(str))) {
        const startIndex = match.index;
        // console.log(match)
        let endIndex = findClosingParen(match.input, startIndex)
        parts.push(
            removeProperties(
                str.substring(startIndex, endIndex), 0, "child")
        );
    }

    return parts;
}

fs.writeFileSync('./output.json', JSON.stringify(splitter(strComp), null, 2));
console.log("done.")
