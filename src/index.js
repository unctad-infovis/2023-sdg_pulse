import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';

import Figure2 from './jsx/Figure2.jsx';

import Figure3a from './jsx/Figure3a.jsx';

import Figure3b from './jsx/Figure3b.jsx';

import Figure3c from './jsx/Figure3c.jsx';

import Figure4 from './jsx/Figure4.jsx';

const containerFigure1 = document.getElementById('app-root-2023-sdg_pulse_figure1');
const rootFigure1 = createRoot(containerFigure1);
rootFigure1.render(<Figure1 />);

const containerFigure2 = document.getElementById('app-root-2023-sdg_pulse_figure2');
const rootFigure2 = createRoot(containerFigure2);
rootFigure2.render(<Figure2 />);

const containerFigure3a = document.getElementById('app-root-2023-sdg_pulse_figure3a');
const rootFigure3a = createRoot(containerFigure3a);
rootFigure3a.render(<Figure3a />);

const containerFigure3b = document.getElementById('app-root-2023-sdg_pulse_figure3b');
const rootFigure3b = createRoot(containerFigure3b);
rootFigure3b.render(<Figure3b />);

const containerFigure3c = document.getElementById('app-root-2023-sdg_pulse_figure3c');
const rootFigure3c = createRoot(containerFigure3c);
rootFigure3c.render(<Figure3c />);

const containerFigure4 = document.getElementById('app-root-2023-sdg_pulse_figure4');
const rootFigure4 = createRoot(containerFigure4);
rootFigure4.render(<Figure4 />);
