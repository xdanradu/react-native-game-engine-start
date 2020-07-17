import React, { Component } from "react";
import Matter from "matter-js";
export default class Bouncy extends Component {
  constructor() {
    this.myCanvas = document.getElementById("c");
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.body = Matter.Body;

    this.img = new Image();
    const ball = require("../assets/ball.png");
    this.img.src = ball;
    this.ballPosx = this.percentX(90);
    this.ballPosy = this.percentY(50);
    this.ballRadius = window.innerWidth / 8;
    this.ball = Matter.Bodies.circle(
      this.ballPosx,
      this.ballPosy,
      this.ballRadius,
      {
        density: 0.1,
        friction: 1,
        frictionAir: 0.0001,
        frictionStatic: 0.1,
        restitution: 0.8,
        render: {
          sprite: {
            texture: url,
            xScale: window.innerWidth / 8 / 180,
            yScale: window.innerWidth / 8 / 180,
          },
        },
      }
    );
    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      element: this.myCanvas,
      constraint: {
        render: {
          visible: false,
        },
        stiffness: 0.8,
      },
    });

    /*testing*/
    this.mouseConstraint.mouse.element.removeEventListener(
      "touchmove",
      this.mouseConstraint.mouse.mousemove
    );
    this.mouseConstraint.mouse.element.removeEventListener(
      "touchstart",
      this.mouseConstraint.mouse.mousedown
    );
    this.mouseConstraint.mouse.element.removeEventListener(
      "touchend",
      this.mouseConstraint.mouse.mouseup
    );

    mouse.mousedown = function (event) {
      var position = Mouse._getRelativeMousePosition(
          event,
          mouse.element,
          mouse.pixelRatio
        ),
        touches = event.changedTouches;

      let isInBallXCoordinates =
        position.x > Ball.bounds.min.x && position.x < Ball.bounds.max.x;
      let isInBallYCoordinates =
        position.y > Ball.bounds.min.y && position.y < Ball.bounds.max.y;
      if (isInBallXCoordinates && isInBallYCoordinates) {
        if (touches) {
          mouse.button = 0;
          event.preventDefault();
        } else {
          mouse.button = event.button;
        }

        mouse.absolute.x = position.x;
        mouse.absolute.y = position.y;
        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
        mouse.mousedownPosition.x = mouse.position.x;
        mouse.mousedownPosition.y = mouse.position.y;
        mouse.sourceEvents.mousedown = event;
      }
    };
    /*testing*/

    Matter.Events.on(this.mouseConstraint, "mousedown", this.handleMouseDown);

    this.width = window.innerWidth;
    this.height =
      window.innerHeight - document.getElementById("header").clientHeight;
    this.render = Matter.Render.create({
      canvas: this.myCanvas,
      engine: this.engine,
      options: {
        width: this.width,
        height: this.height,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    this.mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      this.mouseConstraint.mouse.mousewheel
    );
    this.mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      this.mouseConstraint.mouse.mousewheel
    );

    this.walls = [
      Matter.Bodies.rectangle(this.width / 2, -40, this.width, 40, {
        isStatic: true,
        render: { visible: false },
      }), //top
      Matter.Bodies.rectangle(this.width, this.height / 2, 40, this.height, {
        isStatic: true,
        render: { visible: false },
      }), //right
      Matter.Bodies.rectangle(
        this.width / 2,
        this.height + 20,
        this.width,
        40,
        { isStatic: true, render: { visible: true } }
      ), //bottom
      Matter.Bodies.rectangle(-20, this.height / 2, 40, this.height, {
        isStatic: true,
        render: { visible: false },
      }), //left
    ];
  }

  init = () => {
    this.body.setStatic(this.ball, true);
    Matter.World.add(this.world, this.ball);
    Matter.World.add(this.world, this.mouseConstraint);

    Matter.World.add(this.world, this.walls[0]);
    Matter.World.add(this.world, this.walls[1]);
    Matter.World.add(this.world, this.walls[2]);
    Matter.World.add(this.world, this.walls[3]);
    //start rendering
    Matter.Engine.run(this.engine);
    Matter.Render.run(this.render);
  };
  percentX = (percent) => {
    return Math.round((percent / 100) * window.innerWidth);
  };
  percentY = (percent) => {
    return Math.round((percent / 100) * window.innerHeight);
  };

  handleMouseDown = (event) => {
    const mousePosition = event.mouse.position;

    const isInXCoordinates =
      mousePosition.x > this.ballPosx - this.ballRadius &&
      mousePosition.x < this.ballPosx + this.ballRadius;
    const isInYCoordinates =
      mousePosition.y > this.ballPosy - this.ballRadius &&
      mousePosition.y < this.ballPosy + this.ballRadius;
    if (isInXCoordinates && isInYCoordinates) {
      this.body.setStatic(this.ball, false);
      Matter.Events.off(
        this.mouseConstraint,
        "mousedown",
        this.handleMouseDown
      );
    }
  };
}
