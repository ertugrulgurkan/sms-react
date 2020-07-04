import React, {Component} from "react";
import StudentDataService from "../services/student.service";
import {Link} from "react-router-dom";

export default class StudentList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
        this.retrieveStudent = this.retrieveStudent.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.searchFirstName = this.searchFirstName.bind(this);

        this.state = {
            Student: [],
            currentStudent: null,
            currentIndex: -1,
            searchFirstName: ""
        };
    }

    componentDidMount() {
        this.retrieveStudent();
    }

    onChangeSearchFirstName(e) {
        const searchFirstName = e.target.value;

        this.setState({
            searchFirstName: searchFirstName
        });
    }

    retrieveStudent() {
        StudentDataService.getAll()
            .then(response => {
                this.setState({
                    Student: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    setActiveStudent(Student, index) {
        this.setState({
            currentStudent: Student,
            currentIndex: index
        });
    }


    searchFirstName() {
        StudentDataService.findByFirstName(this.state.searchFirstName)
            .then(response => {
                this.setState({
                    Student: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchFirstName, Student, currentStudent, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by First Name"
                            value={searchFirstName}
                            onChange={this.onChangeSearchFirstName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchFirstName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Student List</h4>

                    <ul className="list-group">
                        {Student &&
                        Student.map((Student, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveStudent(Student, index)}
                                key={index}
                            >
                                {Student.id}
                                {" "+ Student.firstName}
                                {" "+Student.lastName}
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <Link to={"/students/add"} className="btn btn-outline-primary">
                        Add Student
                    </Link>

                </div>
                <div className="col-md-6">
                    {currentStudent ? (
                        <div>
                            <h4>Student</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentStudent.id}
                            </div>
                            <div>
                                <label>
                                    <strong>First Name:</strong>
                                </label>{" "}
                                {currentStudent.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Last Name:</strong>
                                </label>{" "}
                                {currentStudent.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Student Number:</strong>
                                </label>{" "}
                                {currentStudent.studentNumber}
                            </div>

                            <div>
                                <label>
                                    <strong>Phone Number:</strong>
                                </label>{" "}
                                {currentStudent.phoneNumber}
                            </div>

                            <div>
                                <label>
                                    <strong>Courses:</strong>

                                <ul className="list-group">
                                    {currentStudent.courses &&
                                    currentStudent.courses.map((course, index) => (
                                        <li
                                            key={index}
                                        >
                                            {course.id}
                                            {" "+ course.courseName}
                                        </li>
                                    ))}
                                </ul>
                                </label>
                            </div>

                            <Link to={"/students/" + currentStudent.id}
                                className="btn btn-warning">
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Student...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}