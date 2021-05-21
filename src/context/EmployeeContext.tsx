/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useReducer } from "react";
import { IEmployee } from "../models";
import { differenceWith, omit, isEqual } from "lodash";
import employeeReducer from "./employeeReducer";

interface IEmployeeContext {
	list: IEmployee[];
	onFieldChange: (
		id: string,
		value: string,
		fieldName: keyof IEmployee
	) => void;
	onDelete: (id: string) => void;
	getUpdatedList: () => IEmployee[];
	getDeletedList: () => IEmployee[];
	resetList: () => void;
}

/* This context is used to store and handle Employee data */
const EmployeeContext = React.createContext<IEmployeeContext>(null as any);

export const EmployeeContextProvider: React.FC<{ list: IEmployee[] }> = ({
	list,
	children,
}) => {
	const [state, dispatch] = useReducer(employeeReducer, list);

	return (
		<EmployeeContext.Provider
			value={{
				list: state,
				onFieldChange: (id, value, key) => {
					dispatch({ type: "UPDATE", payload: { id, value, key } });
				},
				onDelete: (id) => {
					dispatch({ type: "DELETE", payload: { id } });
				},
				getUpdatedList: () =>
					differenceWith(
						state.filter(({ isDeleted }) => !isDeleted),
						list,
						(x, y) =>
							isEqual(
								omit(x, ["isDeleted"]),
								omit(y, ["isDeleted"])
							)
					),
				getDeletedList: () =>
					state.filter(({ isDeleted }) => isDeleted),
				resetList: () => {
					dispatch({ type: "RESET", payload: { list } });
				},
			}}
		>
			{children}
		</EmployeeContext.Provider>
	);
};

export default EmployeeContext;
