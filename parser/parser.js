const fs = require('fs');
const r = require('ts-regex-builder');
const { WIDGET_CATALOG } = require('../src/widgets');
const { generatePropertyRegex, generateRegex } = require('../src/utils/regex');
const { parseMatch } = require('../src/utils/parser');

const text = fs.readFileSync('./examples/list_builder.dart', { encoding: 'utf-8' });

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

function main() {
    ranges = [];

    const regx = generateRegex({ excludes: [], includes: {} });

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

    const sections = parseMatch(match);


    ranges.push(...sections);
}

function generateOutput() {
    const form = range => JSON.stringify(text.substring(range.startIndex, range.endIndex), null, 0).replace(/\\n/g, '\n')

    let s = ''
    for (let range of ranges)
        s += createMarkdownSection(form(range), range.type === 'highlight' ? 'darkblue' : "darkred") + '\n';


    fs.writeFileSync('./output_multi.md', s);
}

main();
console.log("done.")
