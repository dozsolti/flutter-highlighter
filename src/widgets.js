const { regexSizedBox } = require('./utils/regex/prefabs');

const widgetList = [
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

];

module.exports = { widgetList };