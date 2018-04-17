import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import HeatmapJS from 'heatmap.js';

class About extends React.Component {
    static propTypes = {
        img: PropTypes.string.isRequired
    };
    componentDidMount() {
        this.heatmap = HeatmapJS.create({
            container: this.container,
            radius: 100,
            maxOpacity: .5,
            minOpacity: 0,
            blur: .9,
            gradient: {
                '.5': 'green',
                '.8': 'blue',
                '.95': 'red'
            }
        });
    }
    generateRandomData = len => {
        const points = [];
        let max = 0;
        const { width, height } = this.container.getBoundingClientRect();
        while (len--) {
            const val = Math.floor(Math.random() * 100);
            max = Math.max(max, val);
            const point = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                radius: 100,
                value: val
            };
            points.push(point);
        }
        return points;
    };
    nextMap = () => {
        const dataPoints = [];
        dataPoints.push(this.generateRandomData(300));
        console.log("dataPoints: ", dataPoints);
        this.heatmap.setData(dataPoints);
    }
    render() {
        const { img } = this.props;
        return (
            <div style={{ textAlign: "center" }} >
                <Button type="primary" onClick={this.nextMap}>test</Button>
                <div ref={ref => this.container = ref}
                    style={{
                        width: "80%", height: 600, margin: "auto",
                        border: "1px solid #000", backgroundImage: `url(${img})`,
                        backgroundSize: "100% 100%"
                    }}
                />
            </div>
        );
    }
}
const AboutContainer = connect(
    () => ({ img: require('../../dev/test1.jpg') })
)(About);
export { AboutContainer as About };
