import React, {Component} from "react";
import TeacherDataService from "../services/teacher.service";
import {Link} from "react-router-dom";

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
        this.retrieveTeacher = this.retrieveTeacher.bind(this);
        this.setActiveTeacher = this.setActiveTeacher.bind(this);
        this.searchFirstName = this.searchFirstName.bind(this);

        this.state = {
            Teacher: [],
            currentTeacher: null,
            currentIndex: -1,
            searchFirstName: ""
        };
    }

    componentDidMount() {
        this.retrieveTeacher();
    }

    onChangeSearchFirstName(e) {
        const searchFirstName = e.target.value;

        this.setState({
            searchFirstName: searchFirstName
        });
    }

    retrieveTeacher() {
        TeacherDataService.getAll()
            .then(response => {
                this.setState({
                    Teacher: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    setActiveTeacher(Teacher, index) {
        this.setState({
            currentTeacher: Teacher,
            currentIndex: index
        });
    }


    searchFirstName() {
        TeacherDataService.findByFirstName(this.state.searchFirstName)
            .then(response => {
                this.setState({
                    Teacher: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchFirstName, Teacher, currentTeacher, currentIndex} = this.state;

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
                    <h4>Teacher List</h4>

                    <ul className="list-group">
                        {Teacher &&
                        Teacher.map((Teacher, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTeacher(Teacher, index)}
                                key={index}
                            >
                                {Teacher.id}
                                {" "+ Teacher.firstName}
                                {" "+Teacher.lastName}
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <Link to={"/teachers/add"} className="btn btn-outline-primary">
                        Add Teacher
                    </Link>

                </div>
                <div className="col-md-6">
                    {currentTeacher ? (
                        <div>
                            <h4>Teacher</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentTeacher.id}
                            </div>
                            <div>
                                <label>
                                    <strong>First Name:</strong>
                                </label>{" "}
                                {currentTeacher.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Last Name:</strong>
                                </label>{" "}
                                {currentTeacher.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTeacher.title}
                            </div>

                            <div>
                                <label>
                                    <strong>Phone Number:</strong>
                                </label>{" "}
                                {currentTeacher.phoneNumber}
                            </div>

                            <div>
                                <label>
                                    <strong>Courses:</strong>

                                <ul className="list-group">
                                    {currentTeacher.courses &&
                                    currentTeacher.courses.map((course, index) => (
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

                            <Link to={"/teachers/" + currentTeacher.id}
                                className="btn btn-warning">
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Teacher...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}