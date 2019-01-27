import React from 'react';
import { render }from 'react-dom';

import TablePage from './src/js/pages/TablePage';
import './src/styles/global-styles.scss';

const appWrapper = document.getElementById('root');

appWrapper ? render(
    <TablePage />,
    appWrapper
) : null;
