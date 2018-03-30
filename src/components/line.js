import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

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
        console.log("down: ", this.line);
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
        console.log("up: ", this.line);
        e.preventDefault();
        this.drag = false;
        if (this.isValidArea()) {
            this.setState(prevState => ({
                ...prevState,
                lines: prevState.lines.map(line => ({
                    ...line,
                    decorator: true
                }))
            }));
            this.props.transData({ lines: this.state.lines });
        }
    }
    MouseMove = e => {
        console.log("move: ", this.line);
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
        if (this.line && 2 === Object.getOwnPropertyNames(this.line).length) {
            const MINTH = 30;
            const { start, end } = this.line;
            const dx = start.x - end.x;
            const dy = start.y - end.y;
            return Math.sqrt(dx * dx, dy * dy) >= MINTH;
        }
        return false;
    }
    calcArrowPos = (start, end) => { // solve 
        const ARROWLEN = 20;
        const mid = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };
        const shadowStart = {
            x: (start.x + start.y + end.x - end.y) / 2,
            y: (-start.x + start.y + end.x + end.y) / 2
        };
        const shadowEnd = {
            x: (start.x - start.y + end.x + end.y) / 2,
            y: (start.x + start.y - end.x + end.y) / 2
        };
        const [dx, dy] = [mid.x - start.x, mid.y - start.y];
        const SHADOWLEN = Math.sqrt(dx * dx + dy * dy);
        const EPSLION = ARROWLEN / SHADOWLEN / 2;
        return {
            start: {
                x: mid.x + EPSLION * (shadowStart.x - mid.x),
                y: mid.y + EPSLION * (shadowStart.y - mid.y)
            },
            end: {
                x: mid.x + EPSLION * (shadowEnd.x - mid.x),
                y: mid.y + EPSLION * (shadowEnd.y - mid.y)
            }
        };
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
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                            <path d="M0,0 L0,6 L9,3 z" fill="rgba(251, 166, 75, 1)" />
                        </marker>
                    </defs>
                    {
                        lines.map((line, index) => {
                            const arrowPos = this.calcArrowPos(line.start, line.end);
                            if (line.direction)[arrowPos.start, arrowPos.end] = [arrowPos.end, arrowPos.start];
                            return (
                                <React.Fragment key={`${line.start.x}${line.start.y}${line.end.x}${line.end.y}`}>
                                    <circle cx={line.start.x} cy={line.start.y} r="4" fill="blue" />
                                    <line x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y}
                                        strokeWidth="2px" stroke="#000"
                                    />
                                    <circle cx={line.end.x} cy={line.end.y} r="4" fill="blue" />
                                    {
                                        line.decorator && <React.Fragment>
                                            <line x1={arrowPos.start.x} y1={arrowPos.start.y} x2={arrowPos.end.x} y2={arrowPos.end.y} stroke="rgba(251, 166, 75, 1)" strokeWidth="2" markerEnd="url(#arrow)" />
                                            <foreignObject>
                                                <div ref={ref => this[`lineOperator${index}`] = ref}
                                                    style={{ 
                                                    position: "relative", 
                                                    left: line.end.x - 100, top: line.end.y + 10, 
                                                    display: "flex", flex: "0 0 auto", 
                                                    justifyContent: "space-between",
                                                    opacity: .1,
                                                    transition: "opacity 1s ease-in-out"
                                                }}
                                                    onMouseOver={() => { this[`lineOperator${index}`].style.opacity = "1"; }}
                                                    onMouseLeave={() => { this[`lineOperator${index}`].style.opacity = ".1"; }}
                                                >
                                                    <Button type="primary" size="small" onClick={e => {
                                                        e.preventDefault();
                                                        this.setState(prevState => {
                                                            const nextState = {
                                                                lines: prevState.lines.map((l, i) => {
                                                                    return i === index ? {
                                                                        ...l,
                                                                        direction: !l.direction
                                                                    } : l;
                                                                })
                                                            };
                                                            this.props.transData(nextState);
                                                            return {
                                                                ...prevState,
                                                                ...nextState
                                                            };
                                                        });
                                                    }}>反向</Button>
                                                    <Button type="danger" size="small" onClick={e => {
                                                        e.preventDefault();
                                                        this.setState(prevState => {
                                                            const nextState = {
                                                                lines: [...prevState.lines.slice(0, index), ...prevState.lines.slice(index + 1, prevState.lines.length)]
                                                            };
                                                            this.props.transData(nextState);
                                                            return {
                                                                ...prevState,
                                                                ...nextState
                                                            };
                                                        });
                                                    }}>删除</Button>
                                                </div>
                                            </foreignObject>
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                </svg>
            </div>
        );
    }
}

export default Line;
