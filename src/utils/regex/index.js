import { select } from './utils';

const r = require('ts-regex-builder');

const prefixes = [
    r.optional('const'),
    /\s*/,
]



const regx = r.buildRegExp([
    r.choiceOf(
        // select("Padding", "child"),

        [
            ...prefixes,
            r.choiceOf('Padding', 'Center', 'Expanded', 'Container'),
            '(',
            /.+?(?=child)child/,
            ':'
        ],
        [
            ...prefixes,
            r.choiceOf('Column', 'Row'),
            '(',
            /.+?(?=children)children/,
            ':',
            /\s*/,
            r.optional("<Widget>")
        ],
        [
            "const SizedBox",
            // todo SizedBox
        ]
    )
], {
    global: true,
    ignoreCase: true,
    dotAll: true
})

module.exports = { regx }