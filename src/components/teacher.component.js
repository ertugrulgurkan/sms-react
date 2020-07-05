import React, { Component } from "react";
import TeacherDataService from "../services/teacher.service";
import Select from 'react-select';
import courseDataService from "../services/course.service";
import CourseDataService from "../services/course.service";

export default class Teacher extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeNumberOfClasses = this.onChangeNumberOfClasses.bind(this);
        this.onChangeYear= this.onChangeYear.bind(this);

        this.getTeacher = this.getTeacher.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);

        this.state = {
            currentTeacher: {
                Course: [],
                id: "",
                firstName: "",
                lastName: "",
                phoneNumber:"",
                courses: [],
                title:"",
            },
            newCourse: {
                id: "",
                courseName: "",
                numberOfClasses: "",
                year:"",

                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTeacher(this.props.match.params.id);
        this.retrieveCourse();
    }

    onChangeCourseName(e) {
        const courseName = e.target.value;

        this.setState(prevState => ({
            newCourse: {
                ...prevState.newCourse,
                courseName: courseName
            }
        }));
    }
    onChangeNumberOfClasses(e) {
        const numberOfClasses = e.target.value;

        this.setState(prevState => ({
            newCourse: {
                ...prevState.newCourse,
                numberOfClasses: numberOfClasses
            }
        }));
    }
    onChangeYear(e) {
        const year = e.target.value;

        this.setState(prevState => ({
            newCourse: {
                ...prevState.newCourse,
                year: year
            }
        }));
    }

    onChangeFirstName(e) {
        const firstName = e.target.value;

        this.setState(prevState => ({
            currentTeacher: {
                ...prevState.currentTeacher,
                firstName: firstName
            }
        }));
    }
    onChangeLastName(e) {
        const lastName = e.target.value;

        this.setState(prevState => ({
            currentTeacher: {
                ...prevState.currentTeacher,
                lastName: lastName
            }
        }));
    }
    onChangePhoneNumber(e) {
        const phoneNumber = e.target.value;

        this.setState(prevState => ({
            currentTeacher: {
                ...prevState.currentTeacher,
                phoneNumber: phoneNumber
            }
        }));
    }
    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(prevState => ({
            currentTeacher: {
                ...prevState.currentTeacher,
                title: title
            }
        }));
    }

    getTeacher(id) {
        TeacherDataService.get(id)
            .then(response => {
                this.setState({
                    currentTeacher: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateTeacher() {

        let data = {
            id: this.state.currentTeacher.id,
            firstName: this.state.currentTeacher.firstName,
            lastName: this.state.currentTeacher.lastName,
            phoneNumber:this.state.currentTeacher.phoneNumber,
            title:this.state.currentTeacher.title,
            courses:this.state.currentTeacher.courses
        };
        console.log(data)
        TeacherDataService.update(
            this.state.currentTeacher.id,
            data
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Teacher was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateTeacherForNewCourse() {

        let courses = this.state.currentTeacher.courses;
        const filter = {
            courseName:this.state.newCourse.courseName,
            year:this.state.newCourse.year,
            numberOfClasses:this.state.newCourse.numberOfClasses
        };
        courses.push(filter);
        let data = {
            id: this.state.currentTeacher.id,
            firstName: this.state.currentTeacher.firstName,
            lastName: this.state.currentTeacher.lastName,
            phoneNumber:this.state.currentTeacher.phoneNumber,
            title:this.state.currentTeacher.title,
            courses: [filter]
        };
        console.log(data)
        TeacherDataService.update(
            this.state.currentTeacher.id,
            data
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Teacher was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    deleteTeacher() {
        TeacherDataService.delete(this.state.currentTeacher.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/teachers')
            })
            .catch(e => {
                console.log(e);
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

    handleSubmitEditTeacherForm = e => {
        e.preventDefault();
        this.updateTeacher();
    }
    handleSubmitAddCourseForm = e => {
        e.preventDefault();
        this.updateTeacherForNewCourse();
    }

    render() {
        const { currentTeacher , Course } = this.state;

        return (
            <div>
                {currentTeacher ? (
                    <div className="edit-form">
                        <h4>Teacher</h4>
                        <form onSubmit={this.handleSubmitEditTeacherForm}>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    readOnly={true}
                                    value={currentTeacher.id}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    required
                                    onChange={this.onChangeFirstName}
                                    value={currentTeacher.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="LastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="LastName"
                                    required
                                    onChange={this.onChangeLastName}
                                    value={currentTeacher.lastName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    onChange={this.onChangeTitle}
                                    value={currentTeacher.title}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    required
                                    onChange={this.onChangePhoneNumber}
                                    value={currentTeacher.phoneNumber}
                                />
                            </div>

                            <button
                                className="btn btn-danger"
                                type="submit"
                                onClick={this.deleteTeacher}
                            >
                                Delete
                            </button>
                            {" "}
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Update
                            </button>
                        </form>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Teacher...</p>
                    </div>
                )}
                <h4>Add Course</h4>

                <div className="submit-form">
                    <form onSubmit={this.handleSubmitAddCourseForm}>
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
                                        value={this.state.newCourse.courseName}
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
                                        value={this.state.newCourse.numberOfClasses}
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
                                        value={this.state.newCourse.year}
                                        onChange={this.onChangeYear}
                                        name="year"
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Add New Course
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>


        );
    }
}