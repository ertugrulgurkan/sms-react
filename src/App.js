import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddStudent from "./components/add-student.component";
import Student from "./components/student.component";
import StudentsList from "./components/student-list.component";
import Course from "./components/course.component";
import CourseList from "./components/course-list.component";
import Teacher from "./components/teacher.component";
import AddTeacher from "./components/add-teacher.component";
import TeacherList from "./components/teacher-list.component";


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                SMS - REACT
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/teachers"} className="nav-link">
                    Teachers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/courses"} className="nav-link">
                    Courses
                  </Link>
                </li>
              </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route exact path={"/students"} component={StudentsList} />
                <Route exact path="/students/add" component={AddStudent} />
                <Route path="/students/:id" component={Student} />

                <Route exact path={"/teachers"} component={TeacherList} />
                <Route exact path="/teachers/add" component={AddTeacher} />
                <Route path="/teachers/:id" component={Teacher} />

                <Route exact path={"/courses"} component={CourseList} />
                <Route path="/courses/:id" component={Course} />

              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;