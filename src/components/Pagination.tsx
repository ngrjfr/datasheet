import React, { useContext } from "react";
import styled from "styled-components";
import { range } from "lodash";
import PaginationContext from "../context/PaginationContext";

const Button = styled.button<{ active?: boolean }>`
	width: 40px;
	height: 40px;
	background: ${(props) => (props.active ? "#008080" : "transparent")};
	border: ${(props) => (props.active ? "none" : "1px solid #008080")};
	border-radius: 3px;
	color: ${(props) => (props.active ? "white" : "#008080")};
	margin: 4px;
	cursor: pointer;
`;

const Select = styled.select`
	width: 100px;
	height: 40px;
	border-radius: 3px;
	margin: 4px;
	cursor: pointer;
`;

const PaginationProps = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 48px;
`;

const countOptions = [5, 10, 15, 20];

const Pagination: React.FC = () => {
	const { onPageChange, onCountChange, offset, totalPageCount } =
		useContext(PaginationContext);

	return (
		<PaginationProps>
			<div>
				{totalPageCount != 1 &&
					range(0, totalPageCount).map((x) => (
						<Button
							key={x}
							onClick={() => onPageChange(x)}
							active={offset === x}
						>
							{x + 1}
						</Button>
					))}
			</div>
			<Select onChange={(v) => onCountChange(parseInt(v.target.value))}>
				{countOptions.map((count) => (
					<option key={count} value={count}>
						{count}
					</option>
				))}
			</Select>
		</PaginationProps>
	);
};

Pagination.displayName = "Pagination";

export default Pagination;
