import React, { Component, useEffect, useState } from "react";
export default function UserHome({ userData }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <h1>Nama : {userData.nama}</h1>
          <h1>Email : {userData.email}</h1>
        </div>
      </div>
    </div>
  );
}