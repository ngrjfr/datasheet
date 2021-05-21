import { IEmployee } from "../models";

type Action =
	| {
			type: "UPDATE";
			payload: {
				id: string;
				value: string;
				key: keyof IEmployee;
			};
     }
	| {
			type: "DELETE";
			payload: {
				id: string;
			};
     }
	| {
			type: "RESET";
			payload: {
				list: IEmployee[];
			};
     };

function employeeReducer(state: IEmployee[], action: Action): IEmployee[] {
	switch (action.type) {
	case "UPDATE":
		return state.map((item) =>
			item.id != action.payload?.id
				? item
				: { ...item, [action.payload.key]: action.payload.value }
		);
	case "DELETE":
		return state.map((item) =>
			item.id != action.payload?.id
				? item
				: { ...item, isDeleted: !item.isDeleted }
		);
	case "RESET":
		return action.payload.list;
	default:
		return state;
	}
}

export default employeeReducer;
