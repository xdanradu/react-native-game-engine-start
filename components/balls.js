import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import Matter from "matter-js";

const ball = require("./assets/ball.png");
const RADIUS = 20;

export default class Ball extends PureComponent {
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return <View style={[styles.finger, { left: x, top: y }]} />;
  }
}

const styles = StyleSheet.create({
  finger: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "blue",
    position: "absolute",
  },
});

export { Ball };
