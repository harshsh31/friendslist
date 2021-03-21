import React from "react";
import "./Tooltip.css";

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.timer = "";
    this.state = {
      displayTooltip: false,
      delay: 0,
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  hideTooltip() {
    const delay = this.props.delay;
    if (delay) {
      clearTimeout(this.timer);
    }
    this.setState({ displayTooltip: false });
  }

  showTooltip() {
    const delay = this.props.delay;
    if (delay) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ displayTooltip: true });
      }, 1000);
    } else {
      this.setState({ displayTooltip: true });
    }
  }

  render() {
    let message = this.props.message;
    let position = this.props.position;
    const { hideTooltip } = this.props;
    return (
      <span
        data-id={"tooltip"}
        className={"tooltip"}
        onMouseLeave={this.hideTooltip}
      >
        {this.state.displayTooltip &&
          (!hideTooltip ? (
            <div
              onMouseEnter={this.hideTooltip}
              className={`${"tooltip-bubble"} ${"tooltip-" + position}`}
            >
              <div className={"tooltip-message"}>{message}</div>
            </div>
          ) : (
            ""
          ))}

        <span
          className={"tooltip-trigger"}
          onMouseLeave={this.props.mouseleave ? this.hideTooltip : () => void 0}
          onMouseOver={this.showTooltip}
        >
          {this.props.children}
        </span>
      </span>
    );
  }
}

export default Tooltip;
