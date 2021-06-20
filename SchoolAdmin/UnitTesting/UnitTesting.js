const axios = require('axios');

class UnitTesting {

    static async testWorkloadReportAPI() {
       let res = await axios.get('http://localhost:3000/api/reports/workload');
       return res;
     }
}

module.exports = UnitTesting;
