import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { CommonUtils } from "../../../utils";
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };
    render() {
        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } =
            this.props;
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    className="booking-modal-container"
                    size="md"
                    centered
                    //backdrop={true}
                >
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <FormattedMessage id="doctor.prescription" />
                        </h5>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={closeRemedyModal}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="doctor.email" />
                                </label>
                                <input
                                    type="email"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.handleOnChangeEmail(event)
                                    }
                                    className="form-control"
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="doctor.file" />
                                </label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={(event) =>
                                        this.handleOnChangeImage(event)
                                    }
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSendRemedy}>
                            <FormattedMessage id="doctor.send" />
                        </Button>
                        <Button color="secondary" onClick={closeRemedyModal}>
                            <FormattedMessage id="doctor.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
