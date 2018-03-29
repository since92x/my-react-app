import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon } from 'antd';

const { Option } = Select;

class Area extends React.Component {
    static propTypes = {
        transData: PropTypes.func.isRequired,
        areas: PropTypes.array.isRequired,
        img: PropTypes.string.isRequired
    };
    constructor(...args) {
        super(...args);
        this.state = {
            areas: []
        };
    }
    componentWillMount() {
        const { areas } = this.props;
        this.setState(prevState => ({
            ...prevState,
            areas: areas.map(area => ({
                ...area,
                decorator: true
            }))
        }));
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
        this.rect = {};
        this.drag = true;
        this.matchEpoch = true;
        this.setMousePosition(e);
        const { x, y } = this.mouse;
        const { left, top } = this.wrapper.getBoundingClientRect();
        this.rect = {
            startX: x - left,
            startY: y - top
        };
    }
    MouseUp = e => {
        e.preventDefault();
        this.drag = false;
        // if (!this.isValidArea()) {
        //     this.setState(prevState => ({
        //         ...prevState,
        //         areas: prevState.areas.slice(0, prevState.areas.length - 1)
        //     }));
        // }
        if (this.isValidArea()) {
            this.setState(prevState => ({
                ...prevState,
                areas: prevState.areas.map(area => ({
                    ...area,
                    decorator: true
                }))
            }));
            this.props.transData({ areas: this.state.areas });
        }
    }
    MouseMove = e => {
        e.preventDefault();
        if (this.drag) {
            this.setMousePosition(e);
            const { x, y } = this.mouse;
            const { left, top } = this.wrapper.getBoundingClientRect();
            this.rect.w = x - left - this.rect.startX;
            this.rect.h = y - top - this.rect.startY;
            if (this.isValidArea()) {
                if (this.matchEpoch) {
                    this.matchEpoch = false;
                    this.setState(prevState => ({
                        ...prevState,
                        areas: [...prevState.areas, this.rect]
                    }));
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        areas: [...prevState.areas.slice(0, prevState.areas.length - 1), this.rect]
                    }));
                }
            }
        }
    }
    isValidArea = () => {
        const MINTH = { w: 30, h: 30 };
        const { w, h } = this.rect;
        return w >= MINTH.w && h >= MINTH.h;
    }
    clearArea = index => {
        const originAreas = [...this.state.areas];
        this.setState(prevState => ({
            ...prevState,
            areas: [...prevState.areas.slice(0, index), ...prevState.areas.slice(index + 1, prevState.areas.length)]
        }));
        originAreas.splice(index, 1);
        this.props.transData({ areas: originAreas });
    }
    infoChange = (newVal, curIndex, prop) => { // prop is you what changed property in current area's box
        this.setState(prevState => {
            const nextState = {
                areas: prevState.areas.map((area, i) => {
                    if (i === curIndex) {
                        return {
                            ...area,
                            [prop]: newVal
                        };
                    } else {
                        return area;
                    }
                })
            };
            this.props.transData(nextState);
            return {
                ...prevState,
                ...nextState
            };
        });
    }
    render() {
        const { areas } = this.state;
        const { img } = this.props;
        return (
            <div ref={ref => this.wrapper = ref}
                style={{
                    position: "relative",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "100% 100%",
                    width: "100%",
                    height: "100%"
                }}
                onMouseDown={this.MouseDown} onMouseUp={this.MouseUp} onMouseMove={this.MouseMove}
            >
                {
                    areas.map((area, index) => {
                        const { startX, startY, w, h, decorator } = area;
                        return (
                            <React.Fragment key={`${area.startX}${area.startY}`}>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: startX, top: startY,
                                        width: w, height: h,
                                        backgroundColor: "rgba(76, 111, 255, 0.15)",
                                        border: "1px solid rgba(76, 111, 255, 1)"
                                    }}
                                    onDoubleClick={e => {
                                        e.preventDefault();
                                        this.clearArea(index);
                                    }}
                                >
                                    {decorator && <a
                                        style={{ textDecoration: "none", float: "right", position: "relative", zIndex: 999 }}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.clearArea(index);
                                        }}>
                                        <Icon type="close" />
                                    </a>}
                                </div>
                                {
                                    decorator && <div
                                        style={{
                                            display: "flex",
                                            flex: "0 0 1",
                                            position: "absolute",
                                            left: startX, top: startY + h,
                                            width: 190, height: "auto",
                                        }}
                                    >
                                        <div style={{ display: "block", float: "left" }}>
                                            <Select defaultValue="10.31.11.67" style={{ width: "auto" }}
                                                onChange={(newVal) => {
                                                    this.infoChange(newVal, index, 'info1');
                                                }}
                                            >
                                                <Option value="10.31.11.67">10.31.11.67</Option>
                                                <Option value="10.31.11.68">10.31.11.68</Option>
                                            </Select>
                                            <Select defaultValue="ch1" style={{ width: "auto" }}
                                                onChange={(newVal) => {
                                                    this.infoChange(newVal, index, 'info2');
                                                }}
                                            >
                                                <Option value="ch1">ch1</Option>
                                                <Option value="ch2">ch2</Option>
                                            </Select>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        );
                    })
                }
            </div>
        );
    }
}

export default Area;
