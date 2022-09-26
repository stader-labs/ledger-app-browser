import React from "react";
// import styled from "styled-components";
import styles from "./components.module.scss";

// const CookiesBlockedContainer = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 24px;

//   > * + * {
//     margin-top: 24px;
//   }
// `;

const CookiesBlocked = () => (
  <div className={styles.cookies_blocked}>
    <strong>{"Third-party cookies are disabled"}</strong>
    <div>
      {
        "Please enable third-party cookies in order to make DApps properly works."
      }
    </div>
  </div>
);

export default CookiesBlocked;
