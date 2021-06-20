import Express from 'express';
import { StatusCodes } from 'http-status-codes';

const WorkloadReportController = Express.Router();

//Db Connection
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "root",
  user: "root",
  database: "SchoolAdmin",
  host: "localhost",
  port: "3306"
});


const SelectAllTeacher = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Teacher ', (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

const SelectAllTeacherSchedule = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM TeacherSchedule ', (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

const SelectAllSubject = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Subject ', (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

WorkloadReportController.get('/reports/workload', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Json cannot be empty!"
      })
    }

    //retrieve all existing teacher
    const allTeacherArr = await SelectAllTeacher();
    const allTeacherScheduleArr = await SelectAllTeacherSchedule();
    const allSubjectArr = await SelectAllSubject();

    var workloadObj = {};
    for (var i = 0; i < allTeacherArr.length; i++) {
      const subjectArr = [];
      const distinctArr = [];

      for (var x = 0; x < allTeacherScheduleArr.length; x++) {
        if (allTeacherArr[i].email == allTeacherScheduleArr[x].Teacher_email) {
          subjectArr.push(allTeacherScheduleArr[x].Subject_subjectCode);
          if (!distinctArr.includes(allTeacherScheduleArr[x].Subject_subjectCode)) {
            distinctArr.push(allTeacherScheduleArr[x].Subject_subjectCode);
          }
        }
      }

      var overAllArr = [];
      for (var z = 0; z < distinctArr.length; z++) {
        var classCount = 0;
        var scheduleObj = {};
        for (var c = 0; c < subjectArr.length; c++) {
          if (distinctArr[z] == subjectArr[c])
            classCount++;
        }

        var subjectName;
        for (var v = 0; v < allSubjectArr.length; v++) {
          if (allSubjectArr[v].subjectCode == distinctArr[z]) {
            subjectName = allSubjectArr[v].name;
            break;
          }
        }

        scheduleObj = {
          "subjectCode": distinctArr[z],
          "subjectName": subjectName,
          "numberOfClasses": classCount,
        }

        overAllArr.push(scheduleObj)
      }
      var name = allTeacherArr[i].name

      workloadObj[name] = overAllArr
    }

    res.status(StatusCodes.OK).json(workloadObj);
  } catch (e) {
    console.log(e); // console log the error so we can see it in the console
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export default WorkloadReportController;
