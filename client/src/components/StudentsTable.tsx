import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
	Table,
} from './ui/table';
import { StudentWithTransactions } from '@/types/student';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';

interface StudentsTableProps {
	students: StudentWithTransactions[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
	const [totalAmount, setTotalAmount] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (students) {
			setTotalAmount(
				students.reduce((prevAmount, curr) => {
					return prevAmount + curr.totalTransactionsAmount || 0;
				}, 0)
			);
		}
	}, [students]);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[200px]'>Student ID</TableHead>
					<TableHead className='w-[200px]'>Full name</TableHead>
					<TableHead className='w-[200px]'>Course</TableHead>
					<TableHead className='w-[100px]'>Year</TableHead>
					<TableHead className='w-[100px]'>Transactions made</TableHead>
					<TableHead className='w-[200px] text-right '>
						Transactions amount
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{students.map((student) => (
					<TableRow
						className='cursor-pointer'
						onClick={() => navigate(`/student/${student.studentID}`)}
						key={student._id}
					>
						<TableCell className=''>{student.studentID}</TableCell>
						<TableCell className=''>
							{_.startCase(
								`${student.firstname} ${student.middlename ?? ''} ${
									student.lastname
								}`.toLowerCase()
							)}
						</TableCell>
						<TableCell className=''>{student.course}</TableCell>
						<TableCell className=''>{student.year}</TableCell>
						<TableCell className=''>{student.totalTransactions}</TableCell>
						<TableCell className='text-right'>
							{student.totalTransactionsAmount ?? 0}
						</TableCell>
					</TableRow>
				))}
			</TableBody>

			<TableFooter>
				<TableRow>
					<TableCell colSpan={5}>Total</TableCell>
					<TableCell className='text-right'>{totalAmount}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
