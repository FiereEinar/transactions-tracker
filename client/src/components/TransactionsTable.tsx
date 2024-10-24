import { Transaction } from '@/types/transaction';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateText from './ui/date-text';

type TransactionsTableProps = {
	transactions?: Transaction[];
	isLoading: boolean;
};

export default function TransactionsTable({
	transactions,
	isLoading,
}: TransactionsTableProps) {
	const navigate = useNavigate();
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		if (transactions) {
			setTotalAmount(
				transactions.reduce((prevAmount, curr) => {
					return prevAmount + curr.amount;
				}, 0)
			);
		}
	}, [transactions]);

	return (
		<Table>
			{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Student ID</TableHead>
					<TableHead className='w-[100px]'>Course</TableHead>
					<TableHead className='w-[250px]'>Date</TableHead>
					<TableHead className='w-[400px]'>Category</TableHead>
					<TableHead className='w-[50px]'>Status</TableHead>
					<TableHead className='w-[100px] text-right'>Amount</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{isLoading && (
					<TableRow>
						<TableCell colSpan={7}>Loading...</TableCell>
					</TableRow>
				)}
				{!transactions?.length && !isLoading && (
					<TableRow>
						<TableCell colSpan={7}>No transactions</TableCell>
					</TableRow>
				)}
				{transactions &&
					transactions.map((transaction) => {
						return (
							<TableRow
								onClick={() => navigate(`/transaction/${transaction._id}`)}
								className='cursor-pointer'
								key={transaction._id}
							>
								<TableCell className=''>
									{transaction.owner.studentID}
								</TableCell>
								<TableCell className=''>{transaction.owner.course}</TableCell>
								<TableCell className=''>
									<DateText date={new Date(transaction.date)} />
								</TableCell>
								<TableCell className=''>
									{transaction.category.organization.name} -{' '}
									{transaction.category.name}
								</TableCell>
								<TableCell className=''>
									{transaction.amount >= transaction.category.fee ? (
										<p className='text-green-500'>Paid</p>
									) : (
										<p className='text-yellow-500'>Partial</p>
									)}
								</TableCell>
								<TableCell className='text-right'>
									P{transaction.amount}
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>

			<TableFooter>
				<TableRow>
					<TableCell colSpan={5}>Total</TableCell>
					<TableCell className='text-right'>P{totalAmount}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
