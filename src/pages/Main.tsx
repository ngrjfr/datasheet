import React, { useContext } from "react";
import DataTable from "./../components/DataTable";
import styled from "styled-components";
import EmployeeContext from "../context/EmployeeContext";
import {PaginationContextProvider} from "../context/PaginationContext";
import SearchInput from "../components/SearchInput";
import { IEmployee } from "../models";

const HeaderSection = styled.div`
   display: flex;
   color: #008080;
   margin: 48px 0 64px;
   align-items: center;
`;

const Header = styled.h1`
    width: 1200px;
    margin: 0 auto;
    font-size: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
`;

const Button = styled.button`
    background: #008080;
    border-radius: 3px;
    width: 130px;
    padding: 8px 16px;
    color: white;
    margin: 8px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    border: none;
    cursor: pointer;
`;

const Main:React.FC = () =>{
	const { list, getUpdatedList, getDeletedList, resetList } = useContext(EmployeeContext);

	const onFilter = (item: IEmployee, searchKey: string)=>Boolean(
		item.id.toLocaleLowerCase().includes(searchKey) ||
        item.name.toLocaleLowerCase().includes(searchKey) ||
        item.surname.toLocaleLowerCase().includes(searchKey) ||
        item.phoneNumber.includes(searchKey) ||
        item.position.toLocaleLowerCase().includes(searchKey)||
        item.birthDate.includes(searchKey)
	);
    
	return (
		<PaginationContextProvider
			list={list} 
			filter={onFilter} >
			<HeaderSection>
				<Header>
                    Employees
				</Header>
				<ButtonGroup>
					<Button onClick={resetList}> Reset </Button>
					<Button
						as="a"
						type="button"
						href={`data:text/json;charset=utf-8,${encodeURIComponent(
							JSON.stringify({
								updated: getUpdatedList(),
								deleted: getDeletedList()
							})
						)}`}
						download="employees.json"
					>
						Submit
					</Button>
				</ButtonGroup>
			</HeaderSection>
			<SearchInput />
			<DataTable />
		</PaginationContextProvider>
	);
};

Main.displayName = "Main";

export default Main;
