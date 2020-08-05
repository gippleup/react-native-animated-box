import React, {Component, RefObject} from 'react';
import {
  View,
  ViewStyle,
  Animated,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  TranslateXTransform,
  TranslateYTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
} from 'react-native';

type AnimatedBoxProps = {
  style?: ViewStyle;
};

type Transforms =
  | ScaleTransform
  | ScaleXTransform
  | ScaleYTransform
  | RotateTransform
  | RotateXTransform
  | RotateYTransform
  | RotateZTransform
  | SkewXTransform
  | SkewYTransform
  | TranslateXTransform
  | TranslateYTransform;

type TransformKeys =
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'skewX'
  | 'skewY'
  | 'translateX'
  | 'translateY'
  | 'perspective';

type AnimatedTrasform = {
  [T in TransformKeys]: Animated.Value;
};

export class AnimatedBox extends Component<AnimatedBoxProps, {}> {
  boxRef: RefObject<View> = React.createRef();
  animations: {[index: string]: Animated.CompositeAnimation} = {};

  private style: ViewStyle = {...this.props.style};

  transforms: AnimatedTrasform = {
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
    scale: new Animated.Value(1),
    rotate: new Animated.Value(0),
    perspective: new Animated.Value(1),
    rotateX: new Animated.Value(0),
    rotateY: new Animated.Value(0),
    rotateZ: new Animated.Value(0),
    scaleX: new Animated.Value(1),
    scaleY: new Animated.Value(1),
    skewX: new Animated.Value(0),
    skewY: new Animated.Value(0),
  };

  constructor(props: AnimatedBoxProps) {
    super(props);
    this.setStyle = this.setStyle.bind(this);
    this.addAnimation = this.addAnimation.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.stopAllAnimation = this.stopAllAnimation.bind(this);
    this.resetAnimation = this.resetAnimation.bind(this);
    this.removeAnimation = this.removeAnimation.bind(this);
    this.flattenTransform = this.flattenTransform.bind(this);
    this.shapeTransform = this.shapeTransform.bind(this);
  }

  private flattenTransform = (transformObject: Transforms[]) => {
    if (!transformObject) {
      return {};
    }

    const result: {[index: string]: number | string} = {};

    transformObject.forEach((prop) => {
      const [name, value] = Object.entries(prop)[0];
      result[name] = value;
    });
    return result;
  };

  private shapeTransform = (flattendTransform: {
    TransformKeys: number | string;
  }) => {
    if (!flattendTransform) {
      return [];
    }

    return Object.entries(flattendTransform).reduce<{[index: string]: any}>(
      (acc, [name, value]) => {
        return acc.concat({[name]: value});
      },
      [],
    );
  };

  setStyle(style: ViewStyle) {
    this.boxRef.current?.setNativeProps({style: style});
  }

  resetAnimation(name: string) {
    if (this.animations[name]) {
      this.animations[name].reset();
    }
  }
  startAnimation(name: string, onFinished?: () => void) {
    this.animations[name].start(onFinished);
  }
  stopAnimation(name: string) {
    this.animations[name].stop();
  }
  stopAllAnimation() {
    Object.values(this.animations).forEach((animation) => animation.stop());
  }
  addAnimation(name: string, animation: Animated.CompositeAnimation) {
    Object.defineProperty(this.animations, name, {
      value: animation,
      writable: false,
      configurable: true,
    });
  }
  removeAnimation(name: string) {
    if (this.animations[name]) {
      delete this.animations[name];
    }
  }

  render() {
    const {transforms} = this;
    const angleInterpolation = {
      inputRange: [-1000000, 1000000],
      outputRange: [`${-1000000}deg`, `${1000000}deg`],
    };
    const mappedTransform = Object.entries(transforms).map(([name, anim]) => {
      const propName = name as TransformKeys;
      if (propName.match(/(rotate)?(skew)?/g)?.filter((str) => str).length) {
        return {[propName]: anim.interpolate(angleInterpolation)};
      } else {
        return {[propName]: anim};
      }
    }) as AnimatedTrasform[];
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: mappedTransform,
        }}
        ref={this.boxRef}
      />
    );
  }
}

export default AnimatedBox;
