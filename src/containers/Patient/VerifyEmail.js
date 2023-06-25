import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }
    async componentDidMount() {
        let urlParams = new URLSearchParams(this.props?.location?.search);
        let token = urlParams.get("token");
        let doctorId = urlParams.get("doctorId");
        console.log("t+d: ", token, doctorId);
        let res = await postVerifyBookAppointment({ token, doctorId });
        if (res && res.errCode === 0) {
            this.setState({
                statusVerify: true,
                errCode: res?.errCode,
            });
        } else {
            this.setState({
                statusVerify: true,
                errCode: res?.errCode,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {!statusVerify ? (
                        <div>Loading data...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <div className="infor-booking">
                                    <FormattedMessage id="patient.verify-booking.success" />
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    <FormattedMessage id="patient.verify-booking.failed" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
