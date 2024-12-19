const { regexSizedBox } = require('./prefabs');

const { FLAGS } = require('./shared');
const { selectWithChild, selectWithChildren } = require('./utils');
const r = require('ts-regex-builder');

const config = [
    // Child
    { name: "Align", type: "child", },
    { name: "Padding", "type": "child", },
    { name: "Center", type: "child" },
    { name: "Expanded", type: "child" },
    { name: "Container", type: "child" },
    { name: "ConstrainedBox", type: "child" },
    { name: "FittedBox", type: "child" },
    { name: "Material", type: "child" },
    { name: "SliverToBoxAdapter", type: "child" },
    { name: "SingleChildScrollView", type: "child" },
    { name: "Positioned", type: "child" },

    // Children
    { name: "Column", type: "children" },
    { name: "Row", type: "children" },
    { name: "Stack", type: "children" },


    // Custom
    { name: "SizedBox", type: "custom", regex: regexSizedBox },

    // Delegate
    // { name: "SizedBox", type: "delegate", regex: regexSizedBox },

    // Todo:
    // child: AspectRatio Baseline CustomSingleChildLayout FractionallySize IntrinsicWidth LimitedBox Offstage OverflowBox SizedOverflowBox Transform
    // children: CustomMultiChildLayout CarouselView Flow GridView IndexedStack ListBody Table Wrap

    // with builder function: LayoutBuilder ListView
    // some have delegate SliverPersistentHeader 
    // dont fade out if it's "return Column(..."

]

const generateRegex = ({ excludes, includes }) => {
    let v = config.filter(el => (excludes || []).indexOf(el.name) == -1);

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
