const { regexSizedBox } = require('../../src/utils/regex/prefabs');
const { FLAGS, prefixes } = require('../../src/utils/regex/shared');

const r = require('ts-regex-builder');

const paranthesesOrChild = /.+?(?:(?=\))\)\s*,?|(?=child)child)/;

it("should print my regex", () => {

    const regx = regexSizedBox;

    console.log(regx)
    expect(regx).not.toBeNull();
})