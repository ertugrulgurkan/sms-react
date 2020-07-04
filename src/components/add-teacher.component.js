import React, { Component } from "react";
import TeacherDataService from "../services/teacher.service";
import courseDataService from "../services/course.service";
import Select from 'react-select';
export default class AddTeacher extends Component {
    constructor(props) {
        super(props);
        this.saveTeacher = this.saveTeacher.bind(this);
        this.newTeacher = this.newTeacher.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);


        this.state = {
            Course: [],
            id: "",
            firstName: "",
            lastName: "",
            phoneNumber:"",
            title:"",
            courses:[],
            submitted: false
        };
    }
    componentDidMount() {
        this.retrieveCourse();
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
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    saveTeacher() {
        var data = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            title:this.state.title,
            courses:this.state.courses
        };
        console.log(data)
        TeacherDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phoneNumber: response.data.phoneNumber,
                    title: response.data.title,
                    courses:response.data.courses,
                    submitted: true
                });
                this.props.history.push('/teachers')
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTeacher() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",
            phoneNumber:"",
            title:"",

            submitted: false
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


    handleSubmit = e => {
        e.preventDefault();
        this.saveTeacher();
    }

    handleChange = selectedOption => {
        this.setState({
            courses:selectedOption
        });
    };

    render() {
        const {Course} = this.state;
        let filters = [];
        if (Course != null && filters.length === 0){
            Course.forEach(item => {
                const filter = {
                    label: item.courseName,
                    value: item.id,
                    courseName:item.courseName,
                    id:item.id,
                    year:item.year,
                    numberOfClasses:item.numberOfClasses
                };
                filters.push(filter);
            });
        }

        return (
            <div className="submit-form">
                <form onSubmit={this.handleSubmit}>
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTeacher}>
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
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                onChange={this.onChangeTitle}
                                value={this.state.title}
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

                        <button type="submit" className="btn btn-success">
                            Add
                        </button>
                    </div>
                )}
                </form>
            </div>
        );
    }
}