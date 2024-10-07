import { fetchCategories, submitCategoryForm } from '@/api/category';
import { categorySchema } from '@/lib/validations/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AddCategoryForm() {
	const { refetch } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	});

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
	});

	const onSubmit = async (data: CategoryFormValues) => {
		try {
			console.log(data);
			const result = await submitCategoryForm(data);

			if (!result) {
				setError('root', {
					message: 'Something went wrong while trying to submit your form',
				});
				return;
			}

			if (!result.success) {
				setError('root', {
					message: `${result.message}\n${result.error ?? ''}`,
				});
				return;
			}

			refetch();
			reset();
		} catch (err: any) {
			setError('root', { message: 'Failed to submit category form' });
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex justify-center gap-1' size='sm'>
					<img className='size-5' src='/icons/plus.svg' alt='' />
					<p>Add Category</p>
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add Category</DialogTitle>
					<DialogDescription>Fill up the form</DialogDescription>
				</DialogHeader>

				{/* TODO: factor out all this shit */}
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
					<InputField<CategoryFormValues>
						name='name'
						registerFn={register}
						errors={errors}
						label='Category name:'
						id='name'
					/>

					{errors.root && errors.root.message && (
						<p className='text-xs text-destructive'>
							{errors.root.message.toString()}
						</p>
					)}

					<div className='flex justify-end'>
						<Button className='' disabled={isSubmitting} type='submit'>
							Submit
						</Button>
					</div>
				</form>

				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}