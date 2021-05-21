import React from "react";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import employees from "./employees.json";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";

const GlobalStyle = createGlobalStyle`
  body {
    background: #F5F5F5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`;

const MainWrapper = styled.section`
	width: 1200px;
	margin: 0 auto;
`;

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<MainWrapper>
				<EmployeeContextProvider list={employees}>
					<Main />
				</EmployeeContextProvider>
			</MainWrapper>
		</>
	);
};

export default App;
