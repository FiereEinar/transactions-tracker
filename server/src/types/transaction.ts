export type createTransactionBody = {
	amount: number;
	studentID: string;
	categoryID: string;
	description?: string;
	date?: Date;
};

export type updateTransactionAmountBody = {
	amount: number;
};
