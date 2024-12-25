const WIDGET_CATALOG = {

  //#region Child
  "Align": { properties: [{ name: "child" }] },
  "Padding": { properties: [{ name: "child" }] },
  "Center": { properties: [{ name: "child" }] },
  "Expanded": { properties: [{ name: "child" }] },
  "Container": { properties: [{ name: "child" }] },
  "ConstrainedBox": { properties: [{ name: "child" }] },
  "FittedBox": { properties: [{ name: "child" }] },
  "Material": { properties: [{ name: "child" }] },
  "SliverToBoxAdapter": { properties: [{ name: "child" }] },
  "SingleChildScrollView": { properties: [{ name: "child" }] },
  "Positioned": { properties: [{ name: "child" }] },
  "SizedBox": { properties: [{ name: "child" }] },

  "AspectRatio": { properties: [{ name: "child" }] },
  "Baseline": { properties: [{ name: "child" }] },
  "FractionallySizedBox": { properties: [{ name: "child" }] },
  "IntrinsicWidth": { properties: [{ name: "child" }] },
  "LimitedBox": { properties: [{ name: "child" }] },
  "Offstage": { properties: [{ name: "child" }] },
  "OverflowBox": { properties: [{ name: "child" }] },
  "SizedOverflowBox": { properties: [{ name: "child" }] },
  "Transform": { properties: [{ name: "child" }] },

  //#region Children
  "CarouselView": { properties: [{ name: "children" }] },
  "IndexedStack": { properties: [{ name: "children" }] },
  "ListView": { properties: [{ name: "children" }] },
  "ListBody": { properties: [{ name: "children" }] },
  "Table": { properties: [{ name: "children" }] },
  "Wrap": { properties: [{ name: "children" }] },

  "Column": { properties: [{ name: "children" }] },
  "Row": { properties: [{ name: "children" }] },
  "Stack": { properties: [{ name: "children" }] },


  "ListView.builder": { properties: [{ name: "itemBuilder", type: "function" }, { name: "title" }, { name: "actions", wrapper: '[]' }] },
  "AlertDialog": { properties: [{ name: "title" }, { name: "actions", wrapper: '[]' }] },

  // "BlocBuilder": { propertyName: "builder", wrapper: "{}" }
  
  // Delegate
  "StreamBuilder": { properties: [{ name: "stream" }, { name: "initialData" }, { name: "builder", type: "function" }] }
  // { name: "SizedBox", type: "delegate", regex: regexSizedBox },


  // Child/Delegate: CustomSingleChildLayout
  // Children/Delegate: CustomMultiChildLayout Flow
  // builder: GridView

  // with builder function: LayoutBuilder ListView
  // some have delegate SliverPersistentHeader 
  // dont fade out if it's "return Column(..."
}

module.exports = { WIDGET_CATALOG };