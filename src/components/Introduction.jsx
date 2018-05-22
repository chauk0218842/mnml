import React from 'react';
import styled from 'styled-components';

export const Button = styled.button``;

export const Quote = styled.p``;

const Introduction = ({ className, onClickGetStarted }) => (
  <div className={className}>
    <h1>
      MNML<br />[Min-i-mal]
    </h1>
    <h1>A Photo Album App</h1>
    <hr />
    <Quote>
      "Create a JS app that allows the user to navigate photo albums..."
    </Quote>
    <p>
      For this particular app, I went minimal in terms of UX/UI, and spent most
      of my focus under the hood.
    </p>
    <p>
      Test driven development; functional programming; Redux; on-demand state
      hydration.
    </p>
    <hr />
    <p>Known Issues + Improvements</p>
    <ul>
      <li>Use Re-select for Redux state optimizations</li>
      <li>Menu breadcrumbs needs to be debugged</li>
      <li>
        Resource API-to-Redux state (on-demand state hydration) does not account
        for removed items when updating Redux state
      </li>
      <li>Use React Router for view changes</li>
      <li>Better screen transitions</li>
      <li>Loading status indicator</li>
    </ul>
    <p>
      <Button onClick={onClickGetStarted}>Get Started</Button>
    </p>
  </div>
);

export default Introduction;
