import { Component, RefObject } from 'react';
import { View, ViewStyle, Animated } from 'react-native';
declare type AnimatedBoxProps = {
    style?: ViewStyle;
};
declare type TransformKeys = 'scale' | 'scaleX' | 'scaleY' | 'rotate' | 'rotateX' | 'rotateY' | 'rotateZ' | 'skewX' | 'skewY' | 'translateX' | 'translateY' | 'perspective';
declare type AnimatedTrasform = {
    [T in TransformKeys]: Animated.Value;
};
export declare class AnimatedBox extends Component<AnimatedBoxProps, {}> {
    boxRef: RefObject<View>;
    animations: {
        [index: string]: Animated.CompositeAnimation;
    };
    private style;
    transforms: AnimatedTrasform;
    constructor(props: AnimatedBoxProps);
    private flattenTransform;
    private shapeTransform;
    setStyle(style: ViewStyle): void;
    resetAnimation(name: string): void;
    startAnimation(name: string, onFinished?: () => void): void;
    stopAnimation(name: string): void;
    stopAllAnimation(): void;
    addAnimation(name: string, animation: Animated.CompositeAnimation): void;
    removeAnimation(name: string): void;
    render(): JSX.Element;
}
export default AnimatedBox;
