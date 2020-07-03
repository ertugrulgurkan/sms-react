import React, { Component } from "react";
import StudentDataService from "../services/student.service";

export default class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.saveStudent = this.saveStudent.bind(this);
        this.newStudent = this.newStudent.bind(this);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeStudentNumber = this.onChangeStudentNumber.bind(this);


        this.state = {
            id: null,
            firstName: "",
            lastName: "",
            phoneNumber:"",
            studentNumber:"",

            submitted: false
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }
    onChangeStudentNumber(e) {
        this.setState({
            studentNumber: e.target.value
        });
    }
    saveStudent() {
        var data = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            studentNumber:this.state.studentNumber
        };

        StudentDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber,
                    studentNumber: response.data.studentNumber,

                    submitted: true
                });
                this.props.history.push('/students')
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newStudent() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",
            phoneNumber:"",
            studentNumber:"",

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
                        <button className="btn btn-success" onClick={this.newStudent}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                name="firstName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                required
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                name="lastName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="studentNumber">Student Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="studentNumber"
                                required
                                onChange={this.onChangeStudentNumber}
                                value={this.state.studentNumber}
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
                                value={this.state.phoneNumber}
                            />
                        </div>


                        <button type="submit" onClick={this.saveStudent} className="btn btn-success">
                            Add
                        </button>
                    </div>
                )}
                </form>
            </div>
        );
    }
}