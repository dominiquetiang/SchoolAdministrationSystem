import Express from 'express';
import { StatusCodes } from 'http-status-codes';
import { TestScheduler } from 'jest';
import { ExceptionHandler } from 'winston';

const TeacherController = Express.Router();

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

const SelectAllClass = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Class ', (error, data) => {
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

const SelectAllStudent = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Students ', (error, data) => {
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

//insert new teacher
const insertNewTeacher = (name, email) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO Teacher (name, email) VALUES (?, ?)', [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("New Teacher Created");
    });
  });
};

//Update teacher
const updateTeacher = (name, email) => {
  return new Promise((resolve, reject) => {
    pool.query('Update Teacher SET name = ? where email = ?', [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("Update Teacher Success");
    });
  });
};

//insert new Student
const insertNewStudent = (name, email) => {
  return new Promise((resolve, reject) => {

    pool.query('INSERT INTO Students (name, email) VALUES (?, ?)', [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("New Student Created");
    });
  });
};

//Update Student
const updateStudent = (name, email) => {
  return new Promise((resolve, reject) => {
    pool.query('Update Students SET name = ? where email = ?', [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("Update Student Success");
    });
  });
};

//insert new Subject
const insertNewSubject = (subjectCode, name) => {
  return new Promise((resolve, reject) => {

    pool.query('INSERT INTO Subject (subjectCode, name) VALUES (?, ?)', [subjectCode, name], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("New Subject Created");
    });
  });
};

//Update Subject
const updateSubject = (name, subjectCode) => {
  return new Promise((resolve, reject) => {
    pool.query('Update Subject SET name = ? where subjectCode = ?', [name, subjectCode], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("Update Subject Success");
    });
  });
};

//insert new Class
const insertNewClass = (classCode, name) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO Class (classCode, name) VALUES (?, ?)', [classCode, name], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("New Class Created");
    });
  });
};

//Update Class
const updateClass = (classCode, name) => {
  return new Promise((resolve, reject) => {
    pool.query('Update Class SET name = ? where classCode = ?', [name, classCode], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("Update Class Success");
    });
  });
};

//Update TeacherSchedule
const insertTeacherSchedule = (teacherEmail, subjectCode, classCode) => {
  return new Promise((resolve, reject) => {
    pool.query('Insert INTO TeacherSchedule (Teacher_email,Subject_subjectCode,Class_classCode) Values (?, ?, ?) ', [teacherEmail, subjectCode, classCode], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve("Insert New Teacher Schedule Success");
    });
  });
};

TeacherController.post('/register', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Json cannot be empty!"
      })
    }

    const allTeacherArr = await SelectAllTeacher();
    const allStudentArr = await SelectAllStudent();
    const allSubjectArr = await SelectAllSubject();
    const allClassArr = await SelectAllClass();
    const allTeacherScheduleArr = await SelectAllTeacherSchedule();

    //Assuming data passing in will only have 1 teacher obj, 1 subject obj and 1 Class obj
    var teacherArr = [];
    var studentArr = [];
    var subjectArr = [];
    var classArr = [];

    //check if theres teacher
    if (req.body.hasOwnProperty("class")) {
      //check if theres only 1 teacher
      if (req.body["class"].length === undefined) {
        classArr.push(req.body["class"])
      }
      else {
        for (var i = 0; i < req.body["class"].length; i++) {
          classArr.push(req.body["class"][i]);
        }
      }
    }

    //check if theres teacher
    if (req.body.hasOwnProperty("subject")) {
      //check if theres only 1 teacher
      if (req.body["subject"].length === undefined) {
        subjectArr.push(req.body["subject"])
      }
      else {
        for (var i = 0; i < req.body["subject"].length; i++) {
          subjectArr.push(req.body["subject"][i]);
        }
      }
    }

    //check if theres students
    if (req.body.hasOwnProperty("students")) {
      //check if theres only 1 students
      if (req.body["students"].length === undefined) {
        //if length is undefined, theres only 1 students object
        studentArr.push(req.body["students"])
      }
      else {
        for (var i = 0; i < req.body["students"].length; i++) {
          studentArr.push(req.body["students"][i]);
        }
      }
    }

    //check if theres teacher
    if (req.body.hasOwnProperty("teacher")) {
      //check if theres only 1 teacher
      if (req.body["teacher"].length === undefined) {
        teacherArr.push(req.body["teacher"])
      }
      else {
        for (var i = 0; i < req.body["teacher"].length; i++) {
          teacherArr.push(req.body["teacher"][i]);
        }
      }
    }

    //insert new or update teacher
    for (var x = 0; x < teacherArr.length; x++) {
      var isExist = false;
      for (var i = 0; i < allTeacherArr.length; i++) {
        if (allTeacherArr[i].email == teacherArr[x].email) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        const result = await updateTeacher(teacherArr[x].name, teacherArr[x].email)
      }
      else {
        const result = await insertNewTeacher(teacherArr[x].name, teacherArr[x].email)
      }
    }

    //insert new or update student
    for (var x = 0; x < studentArr.length; x++) {
      var isExist = false;
      for (var i = 0; i < allStudentArr.length; i++) {
        if (allStudentArr[i].email == studentArr[x].email) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        const result = await updateStudent(studentArr[x].name, studentArr[x].email)
      }
      else {
        const result = await insertNewStudent(studentArr[x].name, studentArr[x].email)
      }
    }


    //insert new or update student
    for (var x = 0; x < subjectArr.length; x++) {
      var isExist = false;
      for (var i = 0; i < allSubjectArr.length; i++) {
        if (allSubjectArr[i].subjectCode == subjectArr[x].subjectCode) {
          isExist = true;
          break;
        }
      }
      if (isExist) {
        const result = await updateSubject(subjectArr[x].name, subjectArr[x].subjectCode)
      }
      else {
        const result = await insertNewSubject(subjectArr[x].subjectCode, subjectArr[x].name)
      }
    }

    //insert new or update class
    for (var x = 0; x < classArr.length; x++) {
      var isExist = false;
      for (var i = 0; i < allClassArr.length; i++) {
        if (allClassArr[i].classCode == classArr[x].classCode) {
          
          isExist = true;
          break;
        }
      }
      if (isExist) {
        const result = await updateClass(classArr[x].classCode, classArr[x].name)
      }
      else {
        const result = await insertNewClass(classArr[x].classCode, classArr[x].name)
      }
    }

    //pull the data for overall TeacherSchedule
    //insert body data teacher email, subject code, class code into teacherSchedule for part 2
    //check if theres 2 different teachers teaching the same subject in same class
    var dataMatchExist = false;
    var classCount = 0;
    var subjectCount = 0;

    for (var i = 0; i < allTeacherScheduleArr.length; i++) {
      if (allTeacherScheduleArr[i].Teacher_email == req.body["teacher"].email && allTeacherScheduleArr[i].Subject_subjectCode == req.body["subject"].subjectCode
        && allTeacherScheduleArr[i].Class_classCode == req.body["class"].classCode) {
        dataMatchExist = true;
        console.log("Same data found");
      }
    }

    if (!dataMatchExist) {
      for (var i = 0; i < allTeacherScheduleArr.length; i++) {
        if (allTeacherScheduleArr[i].Subject_subjectCode == req.body["subject"].subjectCode && allTeacherScheduleArr[i].Class_classCode == req.body["class"].classCode) {
          classCount++;
          subjectCount++;
        }
      }
      if (classCount > 1 && subjectCount > 1) {
        throw ("2 teacher already teaching the same subject in the same class");
      }
      else {
        const result = await insertTeacherSchedule(req.body["teacher"].email, req.body["subject"].subjectCode, req.body["class"].classCode);
        console.log(result);
      }
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (e) {
    console.log(e); // console log the error so we can see it in the console
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
});

export default TeacherController;
