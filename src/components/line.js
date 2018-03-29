import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class Line extends React.Component {
    static propTypes = {
        transData: PropTypes.func.isRequired,
        lines: PropTypes.array.isRequired,
        img: PropTypes.string.isRequired
    };
    constructor(...args) {
        super(...args);
        this.state = {
            lines: []
        };
    }
    setMousePosition = e => {
        const ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            this.mouse.x = ev.pageX + window.pageXOffset;
            this.mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            this.mouse.x = ev.clientX + document.body.scrollLeft;
            this.mouse.y = ev.clientY + document.body.scrollTop;
        }
    };
    MouseDown = e => {
        e.preventDefault();
        this.mouse = {};
        this.line = {};
        this.drag = true;
        this.matchEpoch = true;
        this.setMousePosition(e);
        const { x, y } = this.mouse;
        const { left, top } = this.wrapper.getBoundingClientRect();
        this.line.start = {
            x: x - left,
            y: y - top
        };
    }
    MouseUp = e => {
        e.preventDefault();
        this.drag = false;
        if (this.isValidArea()) {
            this.props.transData({ lines: this.state.lines });
        }
    }
    MouseMove = e => {
        e.preventDefault();
        if (this.drag) {
            this.setMousePosition(e);
            const { x, y } = this.mouse;
            const { left, top } = this.wrapper.getBoundingClientRect();
            this.line.end = {
                x: x - left,
                y: y - top
            };
            if (this.isValidArea()) {
                if (this.matchEpoch) {
                    this.matchEpoch = false;
                    this.setState(prevState => ({
                        ...prevState,
                        lines: [...prevState.lines, this.line]
                    }));
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        lines: [...prevState.lines.slice(0, prevState.lines.length - 1), this.line]
                    }));
                }
            }
        }
    }
    isValidArea = () => {
        const MINTH = 30;
        const { start, end } = this.line;
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        return Math.sqrt(dx * dx, dy * dy) >= MINTH;
    }
    render() {
        const { lines } = this.state;
        const { img } = this.props;
        return (
            <div ref={ref => this.wrapper = ref}
                style={{ position: "relative", width: "100%", height: "100%" }}
                onMouseDown={this.MouseDown} onMouseUp={this.MouseUp} onMouseMove={this.MouseMove}
            >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                    ref={ref => this.svg = ref}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "100% 100%",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {
                        lines.map(line => (
                            <g key={`${line.start.x}${line.start.y}${line.end.x}${line.end.y}`}>
                                <circle cx={line.start.x} cy={line.start.y} r="4" fill="blue" />
                                <line x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y}
                                    strokeWidth="2px" stroke="#000"
                                />
                                <circle cx={line.end.x} cy={line.end.y} r="4" fill="blue" />
                                <foreignObject style={{
                                    background: "transparent"
                                }}>
                                    <body xmlns="http://www.w3.org/1999/xhtml">
                                        <div style={{ position: "absolute", left: line.end.x, top: line.end.y }}>
                                            <Select defaultValue={"1"} style={{ width: "auto" }} size="small" >
                                                <Option value="1">type1</Option>
                                                <Option value="2">type2</Option>
                                            </Select>
                                        </div>
                                    </body>
                                </foreignObject>
                            </g>))
                    }
                </svg>
            </div>
        );
    }
}

export default Line;
