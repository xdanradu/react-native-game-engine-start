import React, { PureComponent } from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  StatusBar,
  Button,
  View,
} from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from "./components/Box";
import Ball from "./components/Ball";

Matter.Common.isElement = () => false;

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const engine = Matter.Engine.create({ enableSleeping: false });

const world = engine.world;

const initialBox = Matter.Bodies.rectangle(
  width / 2,
  height / 2,
  boxSize,
  boxSize
);
const floor = Matter.Bodies.rectangle(
  width / 2,
  -100 + height - boxSize / 2,
  width,
  boxSize,
  { isStatic: true }
);
const initialBall = Matter.Bodies.circle(width / 3, height / 3, 5);

Matter.World.add(world, [initialBox, initialBall, floor]);

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default class App extends PureComponent {
  ENTITIES = {
    physics: { engine: engine, world: world },
    floor: {
      body: floor,
      size: [width, boxSize],
      color: "green",
      renderer: Box,
    },
    initialBox: {
      body: initialBox,
      size: [boxSize, boxSize],
      color: "red",
      renderer: Box,
    },
    initialBall: {
      body: initialBall,
      size: [boxSize, boxSize],
      color: "blue",
      renderer: Ball,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      running: true,
    };
  }

  pauseClickHandler = () => {
    this.refs.gameEngine.stop();
  };

  resumeClickHandler = () => {
    this.refs.gameEngine.start();
  };

  restartClickHandler = () => {
    console.log("Restart");
  };

  render() {
    return (
      <View style={styles.game}>
        <View style={styles.header}>
          <Button title="Pause" onPress={this.pauseClickHandler} />
          <Button title="Resume" onPress={this.resumeClickHandler} />
          <Button title="Restart" onPress={this.restartClickHandler} />
        </View>
        <GameEngine
          style={styles.container}
          ref={"gameEngine"}
          systems={[Physics]}
          entities={this.ENTITIES}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    flexDirection: "column",
  },
  header: {
    justifyContent: "center",
    borderBottomWidth: 5,
    borderColor: "red",
    flexDirection: "row",
    marginTop: 50,
  },
  container: {},
});

AppRegistry.registerComponent("App", () => App);
