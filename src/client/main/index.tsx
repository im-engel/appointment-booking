import React from 'react';
import AppointmentsPage from "../appointments/AppointmentsPage"
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');

const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<AppointmentsPage />);