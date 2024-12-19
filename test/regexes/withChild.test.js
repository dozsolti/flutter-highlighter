const fs = require('fs');
const { selectWithChild, selectWithChildren } = require('../../src/utils/regex/utils');

const pages = {
    'paddings': fs.readFileSync('./test/regexes/inputs/paddings.dart', 'utf-8').toString(),
    'location': fs.readFileSync('./test/regexes/inputs/location_page.dart', 'utf-8').toString(),
}

describe.skip('Regex', () => {
    it('should select Columns', () => {
        const regex = selectWithChildren("Column");
        const result = Array.from(pages.location.matchAll(regex));

        expect(result).toMatchSnapshot();
    });
});