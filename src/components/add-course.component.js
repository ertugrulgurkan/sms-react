import React, { Component } from "react";
import CourseDataService from "../services/course.service";

export default class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.saveCourse = this.saveCourse.bind(this);
        this.newCourse = this.newCourse.bind(this);

        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeNumberOfClasses = this.onChangeNumberOfClasses.bind(this);
        this.onChangeYear= this.onChangeYear.bind(this);

        this.state = {
            id: "",
            courseName: "",
            numberOfClasses: "",
            year:"",

            submitted: false
        };
    }

    onChangeCourseName(e) {
        this.setState({
            courseName: e.target.value
        });
    }
    onChangeNumberOfClasses(e) {
        this.setState({
            numberOfClasses: e.target.value
        });
    }
    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    saveCourse() {
        var data = {
            id: this.state.id,
            courseName: this.state.courseName,
            numberOfClasses: this.state.numberOfClasses,
            year:this.state.year
        };

        CourseDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    courseName: response.data.courseName,
                    numberOfClasses: response.data.numberOfClasses,
                    year: response.data.year,

                    submitted: true
                });
                this.props.history.push('/courses')
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCourse() {
        this.setState({
            id: null,
            courseName: "",
            numberOfClasses: "",
            year:"",

            submitted: false
        });
    }

    onSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div className="submit-form">
                <form noValidate onSubmit={this.onSubmit}>
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newCourse}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseName"
                                required
                                value={this.state.courseName}
                                onChange={this.onChangeCourseName}
                                name="courseName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="numberOfClasses">Number Of Classes</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numberOfClasses"
                                required
                                value={this.state.numberOfClasses}
                                onChange={this.onChangeNumberOfClasses}
                                name="numberOfClasses"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input
                                type="number"
                                className="form-control"
                                id="year"
                                required
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                name="year"
                            />
                        </div>
                        <button type="submit" onClick={this.saveCourse} className="btn btn-success">
                            Add
                        </button>
                    </div>
                )}
                </form>
            </div>
        );
    }
}