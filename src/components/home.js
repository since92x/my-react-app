import React from 'react';
import Area from './area';

const IMG = require('../dev/test1.jpg');

class Home extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            areas: []
        };
    }
    transformRect = ({ prevSize, prevRect, nextSize }) => {
        const radio = {
            w: nextSize.w / prevSize.w,
            h: nextSize.h / prevSize.h
        };
        return {
            startX: prevRect.startX * radio.w,
            startY: prevRect.startY * radio.h,
            w: prevRect.w * radio.w,
            h: prevRect.h * radio.h
        };
    }

    handleData = (newVal, prop) => {
        this.setState(prevState => ({
            ...prevState,
            [prop]: newVal
        }));
    }

    render() {
        const { areas } = this.state;
        return (
            <div style={{ display: "flex", flex: "0 0 1", justifyContent: "space-around", padding: "10px" }}>
                <div style={{ marginTop: "40px", width: "400px", height: "300px" }}>
                    <Area
                        img={IMG}
                        areas={areas}
                        transData={data => {
                            this.handleData(data.areas, 'areas');
                        }}
                    />
                </div>
                <div style={{
                    position: "relative",
                    marginTop: "40px",
                    width: "500px",
                    height: "500px",
                    border: "1px solid #000",
                    backgroundImage: `url(${IMG})`,
                    backgroundSize: "100% 100%"
                }}>
                    {
                        areas.map(area => {
                            const nextArea = this.transformRect({
                                prevSize: { w: 400, h: 300 },
                                nextSize: { w: 500, h: 500 },
                                prevRect: { ...area }
                            });
                            return (
                                <div key={`map${nextArea.startX}${nextArea.startY}`}
                                    style={{
                                        position: "absolute",
                                        left: nextArea.startX, top: nextArea.startY,
                                        width: nextArea.w, height: nextArea.h,
                                        backgroundColor: "rgba(76, 111, 255, 0.15)",
                                        border: "1px solid rgba(76, 111, 255, 1)"
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;
