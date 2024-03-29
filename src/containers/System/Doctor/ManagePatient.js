import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
    getAllPatientsForDoctor,
    postSendRemedy,
    cancelAppointment,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }
    async componentDidMount() {
        await this.getDataPatient();
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientsForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                let { user } = this.props;
                let { currentDate } = this.state;

                let formattedDate = new Date(currentDate).getTime();
                await this.getDataPatient();
            }
        );
    };
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item?.doctorId,
            patientId: item?.patientId,
            email: item?.patientData?.email,
            timeType: item?.timeType,
            patientName: item?.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    sendRemedy = async (dataFromModal) => {
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            ...dataFromModal,
            ...this.state.dataModal,
            language: this.props.language,
        });
        this.setState({
            isShowLoading: false,
        });
        if (res && res.errCode === 0) {
            toast.success("Send remedy successfully");
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            toast.error("Send remedy failed");
        }
    };
    handleBtnCancel = async (item) => {
        this.setState({
            isShowLoading: true,
        });
        let res = await cancelAppointment(item.id);
        this.setState({
            isShowLoading: false,
        });
        if (res && res.errCode === 0) {
            toast.success("Delete appointment successfully");
            await this.getDataPatient();
        } else {
            toast.error("Delete appointment failed");
        }
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            <FormattedMessage id="doctor.manage-patient" />
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>
                                    <FormattedMessage id="doctor.date" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th>
                                                <FormattedMessage id="doctor.no" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.time" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.name" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.address" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.gender" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.phoneNumber" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="doctor.actions" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              ?.timeTypeDataPatient
                                                              ?.valueVi
                                                        : item
                                                              ?.timeTypeDataPatient
                                                              ?.valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item?.patientData
                                                              ?.genderData
                                                              ?.valueVi
                                                        : item?.patientData
                                                              ?.genderData
                                                              ?.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item
                                                                    ?.patientData
                                                                    ?.firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item
                                                                    ?.patientData
                                                                    ?.address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            {
                                                                item
                                                                    ?.patientData
                                                                    ?.phoneNumber
                                                            }
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage id="doctor.confirm" />
                                                            </button>
                                                            <button
                                                                className="mp-btn-cancel"
                                                                onClick={() =>
                                                                    this.handleBtnCancel(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage id="doctor.cancel" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    No data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
