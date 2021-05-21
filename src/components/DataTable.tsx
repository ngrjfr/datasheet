import React, { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";
import styled from "styled-components";
import removeImg from "./../images/remove.svg";
import undoImg from "./../images/undo.svg";
import InputMask from "react-input-mask";
import PaginationContext from "../context/PaginationContext";
import Pagination from "./Pagination";

const Table = styled.table`
	border: none !important;
	width: 100%;
	border-collapse: collapse;
`;

const TableHead = styled.thead`
	color: #008080;
`;

const Tr = styled.tr<{ deleted?: boolean }>`
	background: ${(props) => (props.deleted ? "#ffe5e5 !important" : "")};
	&:nth-child(even) {
		background: white;
	}
`;

const Th = styled.th`
	padding: 16px;
	text-align: left;
`;

const Td = styled.td`
	padding: 16px;
`;

const RemoveButton = styled.img`
	width: 32px;
	height: 32px;
	cursor: pointer;
`;

const EmptyResult = styled.div`
	text-align: center;
	padding: 20px;
`;

const Input  = styled.input`
    padding: 8px 4px;
    border: none;
    background: inherit;

    &:focus {
        outline: none;
    }
`;

const DataTable: React.FC = () => {
	const { onFieldChange, onDelete } = useContext(EmployeeContext);
	const { paginatedList } = useContext(PaginationContext);

	return (
		<>
			{paginatedList.length ? (
				<Table>
					<TableHead>
						<Tr>
							<Th> Employee ID </Th>
							<Th> Name </Th>
							<Th> Surname</Th>
							<Th> Phone number</Th>
							<Th> Position</Th>
							<Th> Birth Date</Th>
							<Th />
						</Tr>
					</TableHead>
					<tbody>
						{paginatedList.map(
							({
								id,
								name,
								surname,
								phoneNumber,
								position,
								birthDate,
								isDeleted,
							}) => (
								<Tr key={id} deleted={Boolean(isDeleted)}>
									<Td>
										<Input
											value={id}
											onChange={(v) => onFieldChange(id, v.target.value, "id")}
										/>
									</Td>
									<Td>
										<Input
											onChange={(v) => onFieldChange(id, v.target.value, "name")}
											value={name}
										/>
									</Td>
									<Td>
										<Input
											onChange={(v) => onFieldChange(id, v.target.value, "surname")}
											value={surname}
										/>
									</Td>
									<Td>
										<Input
											as={InputMask}
											mask='(999) 999 99 99'
											onChange={(v: any) => {
												onFieldChange( id,v.target.value.replaceAll(/[^0-9]/g,""), "phoneNumber");
											}}
											value={phoneNumber}
										/>
									</Td>
									<Td>
										<Input
											onChange={(v) => onFieldChange(id, v.target.value, "position")}
											value={position}
										/>
									</Td>
									<Td>
										<Input
											onChange={(v) => onFieldChange(id,v.target.value,"birthDate")}
											value={birthDate}
										/>
									</Td>
									<Td>
										<RemoveButton
											onClick={() => onDelete(id)}
											src={isDeleted ? undoImg : removeImg}
										/>
									</Td>
								</Tr>
							)
						)}
					</tbody>
				</Table>
			) : (
				<EmptyResult> No Results Found</EmptyResult>
			)}
			<Pagination />
		</>
	);
};

DataTable.displayName = "DataTable";

export default DataTable;
