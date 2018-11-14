import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Docs = () => (
  <div style={{ margin: '10px', border: '1px solid #000' }}>
    <Editor />
  </div>
);

const DocsContainer = connect(() => ({
  img: require('../../dev/test1.jpg'),
}))(Docs);
export { DocsContainer as Docs };
