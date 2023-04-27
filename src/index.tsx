import React from 'react';
import ReactDOM from 'react-dom/client';

import Deriv, { useAuthorize, useSubscribe } from '@deriv-experiments/react'

const StatementPage = () => {
  const authorize = useAuthorize();

  const statement = useSubscribe({
    statement: 1,
    description: 1,
    limit: 5,
    offset: 0
  });

  return (
    <div>
      <h1>Statement</h1>

      {authorize
        ? (
          <>
            Logged in as {' '}
            <strong>{authorize.email}</strong>
          </> 
        )
        : (
          <button onClick={Deriv.login}>Login</button>
        )
      }

      <ul>
        <li><a href="/">Dashboard</a></li>
        <li>Statement</li>
        <li><a href="/debug/">Debug</a></li>
      </ul>

      <h2>Recent transactions</h2>
      <ul>
        {statement?.statement?.transactions?.map(transaction => {
          return (
            <li key={transaction.transaction_id}>
              <strong>
                {transaction.action_type}
                {' - '}
                {transaction.amount}
                {' - '}
                {new Date(transaction.transaction_time * 1000).toString()}
              </strong>
              <br />
              {transaction.longcode}
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <StatementPage />
);
