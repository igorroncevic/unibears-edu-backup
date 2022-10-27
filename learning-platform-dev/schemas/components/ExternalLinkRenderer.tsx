import React from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ExternalLinkRenderer = (props: any) => (
    <span>
        {props.children}{' '}
        <span style={{ marginLeft: '2px' }}>
            <FaExternalLinkAlt />
        </span>
    </span>
);

ExternalLinkRenderer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ExternalLinkRenderer;
