import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';

class About extends React.Component {
    static propTypes = {
        img: PropTypes.string.isRequired
    };
    render() {
        const { img } = this.props;
        return (
            <div style={{ textAlign: "center" }} >
                <Button type="primary" onClick={()=>{}}>test</Button>
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
