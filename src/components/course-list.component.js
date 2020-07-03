import React, {Component} from "react";
import courseDataService from "../services/course.service";
import {Link} from "react-router-dom";

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCourseName = this.onChangeSearchCourseName.bind(this);
        this.retrieveCourse = this.retrieveCourse.bind(this);
        this.setActiveCourse = this.setActiveCourse.bind(this);
        this.searchCourseName = this.searchCourseName.bind(this);

        this.state = {
            Course: [],
            currentCourse: null,
            currentIndex: -1,
            searchCourseName: ""
        };
    }

    componentDidMount() {
        this.retrieveCourse();
    }

    onChangeSearchCourseName(e) {
        const courseName = e.target.value;

        this.setState({
            searchCourseName: courseName
        });
    }

    retrieveCourse() {
        courseDataService.getAll()
            .then(response => {
                this.setState({
                    Course: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    setActiveCourse(Course, index) {
        this.setState({
            currentCourse: Course,
            currentIndex: index
        });
    }


    searchCourseName() {
        courseDataService.findByCourseName(this.state.searchCourseName)
            .then(response => {
                this.setState({
                    Course: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchCourseName, Course, currentCourse, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Course Name"
                            value={searchCourseName}
                            onChange={this.onChangeSearchCourseName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchCourseName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Course List</h4>

                    <ul className="list-group">
                        {Course &&
                        Course.map((Course, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveCourse(Course, index)}
                                key={index}
                            >
                                {Course.id}
                                {" "+ Course.courseName}
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <Link to={"/courses/add"} className="btn btn-outline-primary">
                        Add Course
                    </Link>

                </div>
                <div className="col-md-6">
                    {currentCourse ? (
                        <div>
                            <h4>Course</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentCourse.id}
                            </div>

                            <div>
                                <label>
                                    <strong>Course Name:</strong>
                                </label>{" "}
                                {currentCourse.courseName}
                            </div>

                            <div>
                                <label>
                                    <strong>Year:</strong>
                                </label>{" "}
                                {currentCourse.year}
                            </div>

                            <div>
                                <label>
                                    <strong>Number Of Classes:</strong>
                                </label>{" "}
                                {currentCourse.numberOfClasses}
                            </div>

                            <Link to={"/courses/" + currentCourse.id}
                                className="btn btn-warning">
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Course...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}