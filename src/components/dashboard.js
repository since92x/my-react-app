import React from 'react';
import Line from './line';

const IMG = require('../dev/test1.jpg');

class Home extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            lines: []
        };
    }

    transformLine = ({ prevSize, prevLine, nextSize }) => {
        const radio = {
            w: nextSize.w / prevSize.w,
            h: nextSize.h / prevSize.h
        };
        return {
            start: {
                x: prevLine.start.x * radio.w,
                y: prevLine.start.y * radio.h
            },
            end: {
                x: prevLine.end.x * radio.w,
                y: prevLine.end.y * radio.h
            }
        };
    }

    handleData = (newVal, prop) => {
        this.setState(prevState => ({
            ...prevState,
            [prop]: newVal
        }));
    }

    render() {
        const { lines } = this.state;
        return (
            <div style={{ display: "flex", flex: "0 0 1", justifyContent: "space-around", padding: "10px" }}>
                <div style={{ marginTop: "40px", width: "400px", height: "300px" }}>
                    <Line
                        img={IMG}
                        lines={lines}
                        transData={data => {
                            this.handleData(data.lines, 'lines');
                        }}
                    />
                </div>
                <div style={{
                    position: "relative",
                    marginTop: "40px",
                    width: "500px",
                    height: "500px",
                    border: "1px solid #000",
                }}>
                    {
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                            ref={ref => this.svg = ref}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${IMG})`,
                                backgroundSize: "100% 100%"
                            }}
                        >
                            {
                                lines.map(line => {
                                    const nextLine = this.transformLine({
                                        prevSize: { w: 400, h: 300 },
                                        nextSize: { w: 500, h: 500 },
                                        prevLine: { ...line }
                                    });
                                    return (
                                        <g key={`map${nextLine.start.x}${nextLine.start.y}${nextLine.end.x}${nextLine.end.y}`}>
                                            <circle cx={nextLine.start.x} cy={nextLine.start.y} r="4" fill="blue" />
                                            <line x1={nextLine.start.x} y1={nextLine.start.y} x2={nextLine.end.x} y2={nextLine.end.y}
                                                strokeWidth="2px" stroke="#000"
                                            />
                                            <circle cx={nextLine.end.x} cy={nextLine.end.y} r="4" fill="blue" />
                                        </g>);
                                })
                            }
                        </svg>
                    }
                </div>
            </div>
        );
    }
}

export default Home;
