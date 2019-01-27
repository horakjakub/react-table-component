import React from 'react';
import { render }from 'react-dom';

import TablePage from './src/js/pages/TablePage';

const appWrapper = document.getElementById('root');

appWrapper ? render(
    <TablePage />,
    appWrapper
) : null;
