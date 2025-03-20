import React from "react";
import styled from "styled-components";
import { v4 } from "uuid";


const AppContainer = styled.div`
  display: flex;
  // flex-direction: column;
  // overflow: hidden;
  // height: 100%;
  // width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // width: 100%;
  // height: 100vh;
  overflow: hidden;

  justify-content: space-between;
  padding: 30px;
  background-color: #f0f0f0;
`;

const App: React.FC = () => {
  console.log("App component rendered");
  return (
    <AppContainer>
    </AppContainer>
  );
};

export default App;
