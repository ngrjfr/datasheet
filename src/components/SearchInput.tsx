import React, { useContext } from "react";
import styled from "styled-components";
import PaginationContext from "../context/PaginationContext";

const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 16px 8px;
	border: none;
	border-radius: 3px;
	margin-bottom: 50px;

	&:focus {
		outline: none;
	}
`;
const SearchInput: React.FC = () => {
	const { onSearch, onPageChange, searchKey } = useContext(PaginationContext);

	return (
		<Input
			value={searchKey}
			onChange={(v) => {
				onSearch(v.target.value);
				onPageChange(0);
			}}
			placeholder='Search..'
		/>
	);
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
