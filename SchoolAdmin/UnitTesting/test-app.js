const UnitTesting = require('./UnitTesting');

async function getWorkloadReportData() {
    let res = await UnitTesting.testWorkloadReportAPI();
    console.log(res.data);
}

console.log("Testing Workload Report API")
getWorkloadReportData();

console.log('finished')