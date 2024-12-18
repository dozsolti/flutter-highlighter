const r = require('ts-regex-builder');

const regxOld = /((Padding|Center|Expanded|Container)\(.+?(?=child)child:\s*)|((Column|Row)\(.+?(?=children)children:[^[]*)|((Scaffold)\(.+?(?=appBar)appBar:\s*)/gis;

const prefixes = [
    r.optional('const'),
    /\s*/,
]

const regx = r.buildRegExp([
    r.choiceOf(
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