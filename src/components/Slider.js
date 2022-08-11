import React from "react";
import ReactDOM from "react-dom";
import { Range, getTrackBackground, Direction } from "react-range";

const STEP = 1;
const MIN = 3;
const MAX = 12;

class Slider extends React.Component {
  state = {
    values: [3],
  };

  generateMarks() {
    const result = [];

    for (let i = MIN; i <= MAX; i += 2) {
      const height = 0.5 * Math.abs(i) + 25;
      const v = this.state.values[0];

      let bgColorString = "";
      if (v > 0) {
        bgColorString = `${i <= v && i >= 0 ? "#48c6cd" : "#ccc"}`;
      } else {
        bgColorString = "#ccc";
      }

      result.push(
        // if value is 0
        <div
          key={i}
          style={{
            height: `20px`,
            width: "3px",
            borderRadius: "6px",
            backgroundColor: bgColorString,
          }}
        />
      );
    }

    return result;
  }

  render() {
    return (
      <div
        style={{
          textAlign: this.props.textAlign,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "0",
            position: "relative",
            top: "28.8px",
            right: "0px",
          }}
        >
          {this.generateMarks()}
        </div>
        <Range
          disabled={this.props.disabled}
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            this.setState({ values });
            this.props.onValueChange(values);
          }}
          // onChange={() => this.props.onChange(this.setState({values}))}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["transparent", "transparent"],
                    min: MIN,
                    max: MAX,
                    direction: Direction.Left,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "28px",
                width: "3px",
                backgroundColor: "#1e55a9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "6px",
              }}
            ></div>
          )}
        />
        <p>{this.state.values[0]}/32</p>
      </div>
    );
  }
}
export default Slider;
