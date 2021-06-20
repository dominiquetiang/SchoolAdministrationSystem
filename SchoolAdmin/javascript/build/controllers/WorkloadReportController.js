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

var WorkloadReportController = _express["default"].Router(); //Db Connection


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

var SelectAllTeacherSchedule = function SelectAllTeacherSchedule() {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM TeacherSchedule ', function (error, data) {
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

WorkloadReportController.get('/reports/workload', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var allTeacherArr, allTeacherScheduleArr, allSubjectArr, workloadObj, i, subjectArr, distinctArr, x, overAllArr, z, classCount, scheduleObj, c, subjectName, v, name;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!req.body) {
              res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send({
                message: "Json cannot be empty!"
              });
            } //retrieve all existing teacher


            _context.next = 4;
            return SelectAllTeacher();

          case 4:
            allTeacherArr = _context.sent;
            _context.next = 7;
            return SelectAllTeacherSchedule();

          case 7:
            allTeacherScheduleArr = _context.sent;
            _context.next = 10;
            return SelectAllSubject();

          case 10:
            allSubjectArr = _context.sent;
            workloadObj = {};
            i = 0;

          case 13:
            if (!(i < allTeacherArr.length)) {
              _context.next = 41;
              break;
            }

            subjectArr = [];
            distinctArr = [];

            for (x = 0; x < allTeacherScheduleArr.length; x++) {
              if (allTeacherArr[i].email == allTeacherScheduleArr[x].Teacher_email) {
                subjectArr.push(allTeacherScheduleArr[x].Subject_subjectCode);

                if (!distinctArr.includes(allTeacherScheduleArr[x].Subject_subjectCode)) {
                  distinctArr.push(allTeacherScheduleArr[x].Subject_subjectCode);
                }
              }
            }

            overAllArr = [];
            z = 0;

          case 19:
            if (!(z < distinctArr.length)) {
              _context.next = 36;
              break;
            }

            classCount = 0;
            scheduleObj = {};

            for (c = 0; c < subjectArr.length; c++) {
              if (distinctArr[z] == subjectArr[c]) classCount++;
            }

            v = 0;

          case 24:
            if (!(v < allSubjectArr.length)) {
              _context.next = 31;
              break;
            }

            if (!(allSubjectArr[v].subjectCode == distinctArr[z])) {
              _context.next = 28;
              break;
            }

            subjectName = allSubjectArr[v].name;
            return _context.abrupt("break", 31);

          case 28:
            v++;
            _context.next = 24;
            break;

          case 31:
            scheduleObj = {
              "subjectCode": distinctArr[z],
              "subjectName": subjectName,
              "numberOfClasses": classCount
            };
            overAllArr.push(scheduleObj);

          case 33:
            z++;
            _context.next = 19;
            break;

          case 36:
            name = allTeacherArr[i].name;
            workloadObj[name] = overAllArr;

          case 38:
            i++;
            _context.next = 13;
            break;

          case 41:
            res.status(_httpStatusCodes.StatusCodes.OK).json(workloadObj);
            _context.next = 48;
            break;

          case 44:
            _context.prev = 44;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0); // console log the error so we can see it in the console

            res.sendStatus(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 44]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = WorkloadReportController;
exports["default"] = _default;