const { widgetList } = require('../../widgets');

const { FLAGS } = require('./shared');
const { selectWithChild, selectWithChildren } = require('./utils');
const r = require('ts-regex-builder');


const generateRegex = ({ excludes, includes }) => {
    let v = widgetList.filter(el => (excludes || []).indexOf(el.name) == -1);

    v = v.concat(includes);

    return r.buildRegExp([
        r.choiceOf(...v.map((el) => {

            if (el.type == 'child')
                return selectWithChild(el.name);

            if (el.type == 'children')
                return selectWithChildren(el.name);

            if (el.type == 'custom')
                return el.regex;

            throw `Wrong config for for widget: ${el.name}. Type ${el.type} is not supported.`;
        })

        )
    ], FLAGS);
}

module.exports = { generateRegex }
