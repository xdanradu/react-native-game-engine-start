import React, { Component } from "react";
import { View, Image } from "react-native";
import { array, object, string } from "prop-types";

const ball = require("../assets/ball.png");

export default class Ball extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      /*<View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || "pink",
          borderRadius: 100,
        }}
      />*/
      <Image
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
        }}
        resizeMode="stretch"
        source={ball}
      />
    );
  }
}

Ball.propTypes = {
  size: array,
  body: object,
  color: string,
};
