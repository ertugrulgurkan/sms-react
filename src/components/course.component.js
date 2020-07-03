import React, { Component } from "react";
import CourseDataService from "../services/course.service";

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeNumberOfClasses = this.onChangeNumberOfClasses.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);

        this.getCourse = this.getCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

        this.state = {
            currentCourse: {
                id: "",
                courseName: "",
                numberOfClasses: "",
                year:"",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCourse(this.props.match.params.id);
    }

    onChangeCourseName(e) {
        const courseName = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCourse: {
                    ...prevState.currentCourse,
                    courseName: courseName
                }
            };
        });
    }

    onChangeNumberOfClasses(e) {
        const numberOfClasses = e.target.value;

        this.setState(prevState => ({
            currentCourse: {
                ...prevState.currentCourse,
                numberOfClasses: numberOfClasses
            }
        }));
    }
    onChangeYear(e) {
        const year = e.target.value;

        this.setState(prevState => ({
            currentCourse: {
                ...prevState.currentCourse,
                year: year
            }
        }));
    }


    getCourse(id) {
        CourseDataService.get(id)
            .then(response => {
                this.setState({
                    currentCourse: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCourse() {
        var data = {
            id: this.state.currentCourse.id,
            courseName: this.state.currentCourse.courseName,
            numberOfClasses: this.state.currentCourse.numberOfClasses,
            year:this.state.currentCourse.year
        };
        CourseDataService.update(
            this.state.currentCourse.id,
            data
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Course was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCourse() {
        CourseDataService.delete(this.state.currentCourse.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/Courses')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCourse } = this.state;

        return (
            <div>
                {currentCourse ? (
                    <div className="edit-form">
                        <h4>Course</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    readOnly={true}
                                    value={currentCourse.id}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="courseName">Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="courseName"
                                    onChange={this.onChangeCourseName}
                                    value={currentCourse.courseName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numberOfClasses">Number of Classes</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfClasses"
                                    onChange={this.onChangeNumberOfClasses}
                                    value={currentCourse.numberOfClasses}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    onChange={this.onChangeYear}
                                    value={currentCourse.year}
                                />
                            </div>

                        </form>
                        <button
                            className="btn btn-danger"
                            onClick={this.deleteCourse}
                        >
                            Delete
                        </button>
                        {" "}
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateCourse}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Course...</p>
                    </div>
                )}
            </div>
        );
    }
}