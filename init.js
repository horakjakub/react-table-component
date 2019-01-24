import React from 'react';
import { render }from 'react-dom';

import Table from './src/js/components/Table';

const appWrapper = document.getElementById('root');

appWrapper ? render(
    <Table />,
    appWrapper
) : null;
