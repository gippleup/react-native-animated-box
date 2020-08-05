"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedBox = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var AnimatedBox = /** @class */ (function (_super) {
    __extends(AnimatedBox, _super);
    function AnimatedBox(props) {
        var _this = _super.call(this, props) || this;
        _this.boxRef = react_1.default.createRef();
        _this.animations = {};
        _this.style = __assign({}, _this.props.style);
        _this.transforms = {
            translateX: new react_native_1.Animated.Value(0),
            translateY: new react_native_1.Animated.Value(0),
            scale: new react_native_1.Animated.Value(1),
            rotate: new react_native_1.Animated.Value(0),
            perspective: new react_native_1.Animated.Value(1),
            rotateX: new react_native_1.Animated.Value(0),
            rotateY: new react_native_1.Animated.Value(0),
            rotateZ: new react_native_1.Animated.Value(0),
            scaleX: new react_native_1.Animated.Value(1),
            scaleY: new react_native_1.Animated.Value(1),
            skewX: new react_native_1.Animated.Value(0),
            skewY: new react_native_1.Animated.Value(0),
        };
        _this.flattenTransform = function (transformObject) {
            if (!transformObject) {
                return {};
            }
            var result = {};
            transformObject.forEach(function (prop) {
                var _a = Object.entries(prop)[0], name = _a[0], value = _a[1];
                result[name] = value;
            });
            return result;
        };
        _this.shapeTransform = function (flattendTransform) {
            if (!flattendTransform) {
                return [];
            }
            return Object.entries(flattendTransform).reduce(function (acc, _a) {
                var _b;
                var name = _a[0], value = _a[1];
                return acc.concat((_b = {}, _b[name] = value, _b));
            }, []);
        };
        _this.setStyle = _this.setStyle.bind(_this);
        _this.addAnimation = _this.addAnimation.bind(_this);
        _this.startAnimation = _this.startAnimation.bind(_this);
        _this.stopAnimation = _this.stopAnimation.bind(_this);
        _this.stopAllAnimation = _this.stopAllAnimation.bind(_this);
        _this.resetAnimation = _this.resetAnimation.bind(_this);
        _this.removeAnimation = _this.removeAnimation.bind(_this);
        _this.flattenTransform = _this.flattenTransform.bind(_this);
        _this.shapeTransform = _this.shapeTransform.bind(_this);
        return _this;
    }
    AnimatedBox.prototype.setStyle = function (style) {
        var _a;
        (_a = this.boxRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ style: style });
    };
    AnimatedBox.prototype.resetAnimation = function (name) {
        if (this.animations[name]) {
            this.animations[name].reset();
        }
    };
    AnimatedBox.prototype.startAnimation = function (name, onFinished) {
        this.animations[name].start(onFinished);
    };
    AnimatedBox.prototype.stopAnimation = function (name) {
        this.animations[name].stop();
    };
    AnimatedBox.prototype.stopAllAnimation = function () {
        Object.values(this.animations).forEach(function (animation) { return animation.stop(); });
    };
    AnimatedBox.prototype.addAnimation = function (name, animation) {
        Object.defineProperty(this.animations, name, {
            value: animation,
            writable: false,
            configurable: true,
        });
    };
    AnimatedBox.prototype.removeAnimation = function (name) {
        if (this.animations[name]) {
            delete this.animations[name];
        }
    };
    AnimatedBox.prototype.render = function () {
        var transforms = this.transforms;
        var angleInterpolation = {
            inputRange: [-1000000, 1000000],
            outputRange: [-1000000 + "deg", 1000000 + "deg"],
        };
        var mappedTransform = Object.entries(transforms).map(function (_a) {
            var _b, _c;
            var _d;
            var name = _a[0], anim = _a[1];
            var propName = name;
            if ((_d = propName.match(/(rotate)?(skew)?/g)) === null || _d === void 0 ? void 0 : _d.filter(function (str) { return str; }).length) {
                return _b = {}, _b[propName] = anim.interpolate(angleInterpolation), _b;
            }
            else {
                return _c = {}, _c[propName] = anim, _c;
            }
        });
        return (<react_native_1.Animated.View style={__assign(__assign({}, this.props.style), { transform: mappedTransform })} ref={this.boxRef}/>);
    };
    return AnimatedBox;
}(react_1.Component));
exports.AnimatedBox = AnimatedBox;
exports.default = AnimatedBox;
