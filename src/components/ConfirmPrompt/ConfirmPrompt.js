import React from "react";
import onClickOutside from "react-onclickoutside";
import "./ConfirmPrompt.css";

class ConfirmPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: false,
    };
  }

  handleClickOutside = (evt) => {
    // ..handling code goes here...
    const { onClose } = this.props;
    onClose && onClose();
  };

  render() {
    const {
      title,
      message,
      yesBtnText,
      noBtnText,
      onYesClick,
      note,
      textAlign,
    } = this.props;
    return (
      <div
        className={"promptWrapper"}
        style={{ textAlign: textAlign ? textAlign : "center" }}
      >
        <div className={"promptTitleWrapper"}>
          <h3 className={"promptTitle"}>{title}</h3>
          <span className={"closePrompt"} onClick={this.handleClickOutside}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <div className={"promptMessageWrapper"}>
          <p className={"promptMessage"}>{message}</p>
          {note && <p className={"promptNote"}>{note}</p>}
          <div className={"promptButtonWrapper"}>
            <button
              className={`${"promptButton"} ${"promptYesButton"}`}
              disabled={this.state.disableSave ? "disabled" : ""}
              onClick={async () => {
                this.setState(
                  {
                    disableSave: true,
                  },
                  async () => {
                    await onYesClick();
                    this.handleClickOutside();
                  }
                );
              }}
            >
              {yesBtnText}
            </button>
            <button
              className={"promptButton"}
              onClick={this.handleClickOutside}
            >
              {noBtnText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(ConfirmPrompt);
