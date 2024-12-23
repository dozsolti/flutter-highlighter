const WIDGET_CATALOG = {
    "Align": { propertyName: "child" },
    "Padding": { propertyName: "child" },
    "Center": { propertyName: "child" },
    "Expanded": { propertyName: "child" },
    "Container": { propertyName: "child" },
    "ConstrainedBox": { propertyName: "child" },
    "FittedBox": { propertyName: "child" },
    "Material": { propertyName: "child" },
    "SliverToBoxAdapter": { propertyName: "child" },
    "SingleChildScrollView": { propertyName: "child" },
    "Positioned": { propertyName: "child" },
    "SizedBox": { propertyName: "child" },

    "Column": { propertyName: "children" },
    "Row": { propertyName: "children" },
    "Stack": { propertyName: "children" },

    // "BlocBuilder": { propertyName: "builder", wrapper: "{}" }

    // // Custom
    // { name: "SizedBox", type: "custom", regex: regexSizedBox },

    // Delegate
    // { name: "SizedBox", type: "delegate", regex: regexSizedBox },

    // Todo:
    // child: AspectRatio Baseline CustomSingleChildLayout FractionallySize IntrinsicWidth LimitedBox Offstage OverflowBox SizedOverflowBox Transform
    // children: CustomMultiChildLayout CarouselView Flow GridView IndexedStack ListBody Table Wrap

    // with builder function: LayoutBuilder ListView
    // some have delegate SliverPersistentHeader 
    // dont fade out if it's "return Column(..."
}

module.exports = { WIDGET_CATALOG };