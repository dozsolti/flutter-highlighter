const { generateRegex, generatePropertyRegex } = require('../../src/utils/regex');

it("should print my regex", () => {

    const widgetSelectorRegx = generateRegex({ excludes: [], includes: [] });

    console.log("My widget selector regex is:", widgetSelectorRegx);

    expect(widgetSelectorRegx).not.toBeNull();

    const widgetName = "Column";

    const propertyRegex = generatePropertyRegex(widgetName);

    console.log(`Regex for ${widgetName}'s property regex is:`, propertyRegex);

    expect(propertyRegex).not.toBeNull();
})