import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    handleOnChangeInput = (event, id) => {
        this.setState({
            [id]: event.target.value,
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };
    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new specialty successfully");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error("Something is wrong!");
            console.log("Error: ", res);
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">
                    <FormattedMessage id="admin.manage-specialty.manage" />
                </div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-specialty.name" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-specialty.avatar" />
                        </label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={(event) =>
                                this.handleOnChangeImage(event)
                            }
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            <FormattedMessage id="admin.manage-specialty.save" />
                        </button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
