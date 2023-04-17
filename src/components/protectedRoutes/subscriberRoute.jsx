import React, { useState } from "react";
import {  Route } from "react-router-dom";
import cookie from "react-cookies";
import Subscribe from '../subscribe/Subscribe';
export function SubRoutes({ children, ...rest }) {
  

  const code =cookie.load('code')

  
  return (
    <>
      <Route>
        {code ? (
          <Subscribe {...rest} />
        ) : (
         <></>
        )}
      </Route>
    </>
  );
}