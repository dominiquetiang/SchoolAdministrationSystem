"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _jest = require("jest");

var _winston = require("winston");

var TeacherController = _express["default"].Router(); //Db Connection


var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  password: "root",
  user: "root",
  database: "SchoolAdmin",
  host: "localhost",
  port: "3306"
});

var SelectAllTeacher = function SelectAllTeacher() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM Teacher ', function (error, data) {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
};

var SelectAllClass = function SelectAllClass() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM Class ', function (error, data) {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
};

var SelectAllSubject = function SelectAllSubject() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM Subject ', function (error, data) {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
};

var SelectAllStudent = function SelectAllStudent() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM Students ', function (error, data) {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
};

var SelectAllTeacherSchedule = function SelectAllTeacherSchedule() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM TeacherSchedule ', function (error, data) {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
}; //insert new teacher


var insertNewTeacher = function insertNewTeacher(name, email) {
  return new Promise(function (resolve, reject) {
    pool.query('INSERT INTO Teacher (name, email) VALUES (?, ?)', [name, email], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("New Teacher Created");
    });
  });
}; //Update teacher


var updateTeacher = function updateTeacher(name, email) {
  return new Promise(function (resolve, reject) {
    pool.query('Update Teacher SET name = ? where email = ?', [name, email], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("Update Teacher Success");
    });
  });
}; //insert new Student


var insertNewStudent = function insertNewStudent(name, email) {
  return new Promise(function (resolve, reject) {
    pool.query('INSERT INTO Students (name, email) VALUES (?, ?)', [name, email], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("New Student Created");
    });
  });
}; //Update Student


var updateStudent = function updateStudent(name, email) {
  return new Promise(function (resolve, reject) {
    pool.query('Update Students SET name = ? where email = ?', [name, email], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("Update Student Success");
    });
  });
}; //insert new Subject


var insertNewSubject = function insertNewSubject(subjectCode, name) {
  return new Promise(function (resolve, reject) {
    pool.query('INSERT INTO Subject (subjectCode, name) VALUES (?, ?)', [subjectCode, name], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("New Subject Created");
    });
  });
}; //Update Subject


var updateSubject = function updateSubject(name, subjectCode) {
  return new Promise(function (resolve, reject) {
    pool.query('Update Subject SET name = ? where subjectCode = ?', [name, subjectCode], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("Update Subject Success");
    });
  });
}; //insert new Class


var insertNewClass = function insertNewClass(classCode, name) {
  return new Promise(function (resolve, reject) {
    pool.query('INSERT INTO Class (classCode, name) VALUES (?, ?)', [classCode, name], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("New Class Created");
    });
  });
}; //Update Class


var updateClass = function updateClass(classCode, name) {
  return new Promise(function (resolve, reject) {
    pool.query('Update Class SET name = ? where classCode = ?', [name, classCode], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("Update Class Success");
    });
  });
}; //Update TeacherSchedule


var insertTeacherSchedule = function insertTeacherSchedule(teacherEmail, subjectCode, classCode) {
  return new Promise(function (resolve, reject) {
    pool.query('Insert INTO TeacherSchedule (Teacher_email,Subject_subjectCode,Class_classCode) Values (?, ?, ?) ', [teacherEmail, subjectCode, classCode], function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve("Insert New Teacher Schedule Success");
    });
  });
};

TeacherController.post('/register', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var allTeacherArr, allStudentArr, allSubjectArr, allClassArr, allTeacherScheduleArr, teacherArr, studentArr, subjectArr, classArr, i, x, isExist, result, _result, _result2, _result3, _result4, _result5, _result6, _result7, dataMatchExist, classCount, subjectCount, _result8;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!req.body) {
              res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: "Json cannot be empty!"
              });
            }

            _context.next = 4;
            return SelectAllTeacher();

          case 4:
            allTeacherArr = _context.sent;
            _context.next = 7;
            return SelectAllStudent();

          case 7:
            allStudentArr = _context.sent;
            _context.next = 10;
            return SelectAllSubject();

          case 10:
            allSubjectArr = _context.sent;
            _context.next = 13;
            return SelectAllClass();

          case 13:
            allClassArr = _context.sent;
            _context.next = 16;
            return SelectAllTeacherSchedule();

          case 16:
            allTeacherScheduleArr = _context.sent;
            //Assuming data passing in will only have 1 teacher obj, 1 subject obj and 1 Class obj
            teacherArr = [];
            studentArr = [];
            subjectArr = [];
            classArr = []; //check if theres teacher

            if (req.body.hasOwnProperty("class")) {
              //check if theres only 1 teacher
              if (req.body["class"].length === undefined) {
                classArr.push(req.body["class"]);
              } else {
                for (i = 0; i < req.body["class"].length; i++) {
                  classArr.push(req.body["class"][i]);
                }
              }
            } //check if theres teacher


            if (req.body.hasOwnProperty("subject")) {
              //check if theres only 1 teacher
              if (req.body["subject"].length === undefined) {
                subjectArr.push(req.body["subject"]);
              } else {
                for (i = 0; i < req.body["subject"].length; i++) {
                  subjectArr.push(req.body["subject"][i]);
                }
              }
            } //check if theres students


            if (req.body.hasOwnProperty("students")) {
              //check if theres only 1 students
              if (req.body["students"].length === undefined) {
                //if length is undefined, theres only 1 students object
                studentArr.push(req.body["students"]);
              } else {
                for (i = 0; i < req.body["students"].length; i++) {
                  studentArr.push(req.body["students"][i]);
                }
              }
            } //check if theres teacher


            if (req.body.hasOwnProperty("teacher")) {
              //check if theres only 1 teacher
              if (req.body["teacher"].length === undefined) {
                teacherArr.push(req.body["teacher"]);
              } else {
                for (i = 0; i < req.body["teacher"].length; i++) {
                  teacherArr.push(req.body["teacher"][i]);
                }
              }
            } //insert new or update teacher


            x = 0;

          case 26:
            if (!(x < teacherArr.length)) {
              _context.next = 48;
              break;
            }

            isExist = false;
            i = 0;

          case 29:
            if (!(i < allTeacherArr.length)) {
              _context.next = 36;
              break;
            }

            if (!(allTeacherArr[i].email == teacherArr[x].email)) {
              _context.next = 33;
              break;
            }

            isExist = true;
            return _context.abrupt("break", 36);

          case 33:
            i++;
            _context.next = 29;
            break;

          case 36:
            if (!isExist) {
              _context.next = 42;
              break;
            }

            _context.next = 39;
            return updateTeacher(teacherArr[x].name, teacherArr[x].email);

          case 39:
            result = _context.sent;
            _context.next = 45;
            break;

          case 42:
            _context.next = 44;
            return insertNewTeacher(teacherArr[x].name, teacherArr[x].email);

          case 44:
            _result = _context.sent;

          case 45:
            x++;
            _context.next = 26;
            break;

          case 48:
            x = 0;

          case 49:
            if (!(x < studentArr.length)) {
              _context.next = 71;
              break;
            }

            isExist = false;
            i = 0;

          case 52:
            if (!(i < allStudentArr.length)) {
              _context.next = 59;
              break;
            }

            if (!(allStudentArr[i].email == studentArr[x].email)) {
              _context.next = 56;
              break;
            }

            isExist = true;
            return _context.abrupt("break", 59);

          case 56:
            i++;
            _context.next = 52;
            break;

          case 59:
            if (!isExist) {
              _context.next = 65;
              break;
            }

            _context.next = 62;
            return updateStudent(studentArr[x].name, studentArr[x].email);

          case 62:
            _result2 = _context.sent;
            _context.next = 68;
            break;

          case 65:
            _context.next = 67;
            return insertNewStudent(studentArr[x].name, studentArr[x].email);

          case 67:
            _result3 = _context.sent;

          case 68:
            x++;
            _context.next = 49;
            break;

          case 71:
            x = 0;

          case 72:
            if (!(x < subjectArr.length)) {
              _context.next = 94;
              break;
            }

            isExist = false;
            i = 0;

          case 75:
            if (!(i < allSubjectArr.length)) {
              _context.next = 82;
              break;
            }

            if (!(allSubjectArr[i].subjectCode == subjectArr[x].subjectCode)) {
              _context.next = 79;
              break;
            }

            isExist = true;
            return _context.abrupt("break", 82);

          case 79:
            i++;
            _context.next = 75;
            break;

          case 82:
            if (!isExist) {
              _context.next = 88;
              break;
            }

            _context.next = 85;
            return updateSubject(subjectArr[x].name, subjectArr[x].subjectCode);

          case 85:
            _result4 = _context.sent;
            _context.next = 91;
            break;

          case 88:
            _context.next = 90;
            return insertNewSubject(subjectArr[x].subjectCode, subjectArr[x].name);

          case 90:
            _result5 = _context.sent;

          case 91:
            x++;
            _context.next = 72;
            break;

          case 94:
            x = 0;

          case 95:
            if (!(x < classArr.length)) {
              _context.next = 117;
              break;
            }

            isExist = false;
            i = 0;

          case 98:
            if (!(i < allClassArr.length)) {
              _context.next = 105;
              break;
            }

            if (!(allClassArr[i].classCode == classArr[x].classCode)) {
              _context.next = 102;
              break;
            }

            isExist = true;
            return _context.abrupt("break", 105);

          case 102:
            i++;
            _context.next = 98;
            break;

          case 105:
            if (!isExist) {
              _context.next = 111;
              break;
            }

            _context.next = 108;
            return updateClass(classArr[x].classCode, classArr[x].name);

          case 108:
            _result6 = _context.sent;
            _context.next = 114;
            break;

          case 111:
            _context.next = 113;
            return insertNewClass(classArr[x].classCode, classArr[x].name);

          case 113:
            _result7 = _context.sent;

          case 114:
            x++;
            _context.next = 95;
            break;

          case 117:
            //pull the data for overall TeacherSchedule
            //insert body data teacher email, subject code, class code into teacherSchedule for part 2
            //check if theres 2 different teachers teaching the same subject in same class
            dataMatchExist = false;
            classCount = 0;
            subjectCount = 0;

            for (i = 0; i < allTeacherScheduleArr.length; i++) {
              if (allTeacherScheduleArr[i].Teacher_email == req.body["teacher"].email && allTeacherScheduleArr[i].Subject_subjectCode == req.body["subject"].subjectCode && allTeacherScheduleArr[i].Class_classCode == req.body["class"].classCode) {
                dataMatchExist = true;
                console.log("Same data found");
              }
            }

            if (dataMatchExist) {
              _context.next = 131;
              break;
            }

            for (i = 0; i < allTeacherScheduleArr.length; i++) {
              if (allTeacherScheduleArr[i].Subject_subjectCode == req.body["subject"].subjectCode && allTeacherScheduleArr[i].Class_classCode == req.body["class"].classCode) {
                classCount++;
                subjectCount++;
              }
            }

            if (!(classCount > 1 && subjectCount > 1)) {
              _context.next = 127;
              break;
            }

            throw "2 teacher already teaching the same subject in the same class";

          case 127:
            _context.next = 129;
            return insertTeacherSchedule(req.body["teacher"].email, req.body["subject"].subjectCode, req.body["class"].classCode);

          case 129:
            _result8 = _context.sent;
            console.log(_result8);

          case 131:
            return _context.abrupt("return", res.sendStatus(_httpStatusCodes.StatusCodes.NO_CONTENT));

          case 134:
            _context.prev = 134;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0); // console log the error so we can see it in the console

            res.sendStatus(_httpStatusCodes.StatusCodes.BAD_REQUEST);

          case 138:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 134]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = TeacherController;
exports["default"] = _default;