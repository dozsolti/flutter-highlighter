const { escape } = require('querystring');
const { WIDGET_CATALOG } = require('../src/widgets');
const fs = require('fs');
// const { WIDGET_CATALOG } = require('../src/widgets');

const text = fs.readFileSync('./input.dart', { encoding: 'utf-8' });
const r = require('ts-regex-builder');

function createMarkdownSection(text, backgroundColor) {
    function escapeHtml(str) {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return str.replace(/[&<>"']/g, function (char) {
            return entities[char];
        });
    }
    return `
  <pre style="background-color: ${backgroundColor}; padding: 10px 0; margin-bottom: 24px">
    ${escapeHtml(text)}
  </pre>
  `;
}

let ranges = [];

function generateRegex() {
    return (r.buildRegExp(
        [
            r.choiceOf(...Object.keys(WIDGET_CATALOG)),
            r.zeroOrMore(r.whitespace),
            '(',
        ], {
        global: true,
        ignoreCase: true,
    })
    )
    // console.log(/(Align|Padding|Center|Expanded|Container|ConstrainedBox|FittedBox|Material|SliverToBoxAdapter|SingleChildScrollView|Positioned|Column|Row|Stack|SizedBox)\s*\(/gi);

    // return /(Align|Padding|Center|Expanded|Container|ConstrainedBox|FittedBox|Material|SliverToBoxAdapter|SingleChildScrollView|Positioned|Column|Row|Stack|SizedBox)\s*\(/gi
}

//#region Utils
function findClosingParen(text, openPos, parentheses = "()") {
    let closePos = openPos;
    let counter = 1;
    while (text[closePos] != parentheses[0]) closePos++;
    while (counter > 0) {
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
    // console.log(propertyName)
    const endIndex = findClosingParen(s, startIndex);


    const m = s.substring(startIndex).match(propertyRegex);

    let propertyStartIndex = startIndex;
    if (m) {
        // m.input = "<long text>";
        // console.log(m);

        propertyStartIndex = startIndex +
            m.index +
            m[0].length;
    }

    const propertyEndIndex = findClosingParen(s, propertyStartIndex, parentheses);

    // The widget ended but didn't had the propertyName
    if (endIndex < propertyStartIndex)
        return [{ startIndex, endIndex: endIndex, type: 'highlight' }];

    return [
        { startIndex, endIndex: propertyStartIndex, type: 'fade' },
        // { startIndex: propertyStartIndex, endIndex: propertyEndIndex, type: 'highlight' },
        { startIndex: propertyEndIndex, endIndex, type: 'fade' },
    ];


}

//#endregion

function main() {
    ranges = [];

    const regx = generateRegex();

    let match;
    let runOnElement = 3;
    let runs = 0;
    while (match = regx.exec(text)) {
        // if (runs == runOnElement) 
            {
            _exec(match);
            // break;
        }
        runs++;
    }

    generateOutput();
}

function _exec(match) {

    const widgetName = match[0].replace(/[^a-z]/gi, '');
    const propertyName = WIDGET_CATALOG[widgetName];
    const propertyRegex = r.buildRegExp(
        [
            propertyName,
            r.zeroOrMore(r.whitespace),
            ':',
            r.zeroOrMore(r.whitespace),
            r.optional(["<",
                r.oneOrMore(r.word),
                ">"])
        ]
    );

    const parentheses = propertyName == 'child' ? '()' : '[]';

    const sections = findClosing(match.input, match.index, propertyRegex, parentheses);


    ranges.push(...sections);
}

function generateOutput() {
    const form = r => JSON.stringify(text.substring(r.startIndex, r.endIndex), null, 0).replace(/\\n/g, '\n')

    let s = ''
    for (let r of ranges)
        s += createMarkdownSection(form(r), r.type === 'fade' ? "darkred" : 'darkblue') + '\n';


    fs.writeFileSync('./output.md', s);
}

main();
console.log("done.")
