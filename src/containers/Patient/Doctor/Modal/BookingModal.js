import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            selectedGender: "",
            doctorId: "",
            genders: "",
            timeType: "",
        };
    }
    async componentDidMount() {
        this.props.getGender();
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let doctorId =
                this.props.dataTime && !_.isEmpty(this.props.dataTime)
                    ? this.props.dataTime?.doctorId
                    : "";
            let timeType = this.props.dataTime?.timeType;
            this.setState({
                doctorId,
                timeType,
            });
        }
    }
    handleOnChangeInput = (event, id) => {
        this.setState({
            [id]: event.target.value,
        });
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0],
        });
    };
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };
    handleConfirmBooking = async () => {
        //validate
        let date = new Date(this.state.birthDay).getTime();
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date,
            selectedGender: this.state.selectedGender?.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment successfully");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new appointment error!");
        }
        console.log("Click: ", this.state);
    };
    render() {
        // toggle = {};
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    className="booking-modal-container"
                    size="lg"
                    centered
                    //backdrop={true}
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={closeBookingModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "fullName"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "phoneNumber"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "email"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "address"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "reason"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        selected={this.state.birthDay}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={this.handleConfirmBooking}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button
                                className="btn-booking-cancel"
                                onClick={closeBookingModal}
                            >
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);