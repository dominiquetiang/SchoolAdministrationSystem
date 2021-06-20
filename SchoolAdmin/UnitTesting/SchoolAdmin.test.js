const axios = require('axios');
const UnitTesting = require('./UnitTesting');

jest.mock('axios');

test('should fetch workload report data', () => {
    UnitTesting.testWorkloadReportAPI();
});

