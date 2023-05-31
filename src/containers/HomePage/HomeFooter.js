import React, { Component } from "react";
import { connect } from "react-redux";
class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; {new Date().getFullYear()} Mai Nhat Quang. More
                    information, please visit my Youtube channel{" "}
                    <a
                        href="https://www.youtube.com/channel/UC9GnTmIA8IESH5thAMU5y6A"
                        target="_blank"
                    >
                        &rarr; Click here &larr;
                    </a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
