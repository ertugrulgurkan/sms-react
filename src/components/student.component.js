import React, { Component } from "react";
import StudentDataService from "../services/student.service";

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeStudentNumber = this.onChangeStudentNumber.bind(this);

        this.getStudent = this.getStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);

        this.state = {
            currentStudent: {
                id: "",
                firstName: "",
                lastName: "",
                phoneNumber:"",
                studentNumber:"",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getStudent(this.props.match.params.id);
    }

    onChangeFirstName(e) {
        const firstName = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                firstName: firstName
            }
        }));
    }
    onChangeLastName(e) {
        const lastName = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                lastName: lastName
            }
        }));
    }
    onChangePhoneNumber(e) {
        const phoneNumber = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                phoneNumber: phoneNumber
            }
        }));
    }
    onChangeStudentNumber(e) {
        const studentNumber = e.target.value;

        this.setState(prevState => ({
            currentStudent: {
                ...prevState.currentStudent,
                studentNumber: studentNumber
            }
        }));
    }

    getStudent(id) {
        StudentDataService.get(id)
            .then(response => {
                this.setState({
                    currentStudent: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStudent() {
        var data = {
            id: this.state.currentStudent.id,
            firstName: this.state.currentStudent.firstName,
            lastName: this.state.currentStudent.lastName,
            phoneNumber:this.state.currentStudent.phoneNumber,
            studentNumber:this.state.currentStudent.studentNumber
        };
        StudentDataService.update(
            this.state.currentStudent.id,
            data
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Student was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteStudent() {
        StudentDataService.delete(this.state.currentStudent.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/students')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentStudent } = this.state;

        return (
            <div>
                {currentStudent ? (
                    <div className="edit-form">
                        <h4>Student</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    readOnly={true}
                                    value={currentStudent.id}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    onChange={this.onChangeFirstName}
                                    value={currentStudent.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="LastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="LastName"
                                    onChange={this.onChangeLastName}
                                    value={currentStudent.lastName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="studentNumber">Student Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="studentNumber"
                                    onChange={this.onChangeStudentNumber}
                                    value={currentStudent.studentNumber}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    onChange={this.onChangePhoneNumber}
                                    value={currentStudent.phoneNumber}
                                />
                            </div>
                        </form>
                        <button
                            className="btn btn-danger"
                            onClick={this.deleteStudent}
                        >
                            Delete
                        </button>
                        {" "}
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateStudent}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Student...</p>
                    </div>
                )}
            </div>
        );
    }
}