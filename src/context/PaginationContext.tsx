import React, { useState } from "react";

interface IPaginationContext {
	searchKey: string;
	countOnEachPage: number;
	offset: number;
	totalPageCount: number;
	paginatedList: [];
	onPageChange: (offset: number) => void;
	onCountChange: (count: number) => void;
	onSearch: (searchKey: string) => void;
}

/* This context is used to handle Pagination and Search input data */
const PaginationContext = React.createContext<IPaginationContext>(null as any);

interface IProps<T> {
	list: Array<T>;
	filter: (item: T, searchKey: string) => boolean;
	children: JSX.Element | JSX.Element[];
}

export function PaginationContextProvider<T>({
	list,
	filter,
	children,
}: IProps<T>): React.ReactElement {
	const [offset, setOffset] = useState(0);
	const [count, setCount] = useState(5);
	const [searchKey, setSearchKey] = useState("");

	const filteredList = searchKey
		? list.filter((item) => filter(item, searchKey))
		: [...list];

	return (
		<PaginationContext.Provider
			value={{
				countOnEachPage: count,
				offset,
				totalPageCount: Math.ceil(filteredList.length / count),
				paginatedList: filteredList.splice(offset * count, count) as [],
				onPageChange: (offset) => setOffset(offset),
				onCountChange: (count) => setCount(count),
				onSearch: (searchKey) => setSearchKey(searchKey),
				searchKey,
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
}

PaginationContextProvider.displayName = "PaginationContextProvider";

export default PaginationContext;
