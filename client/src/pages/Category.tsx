import { fetchCategories } from '@/api/category';
import { fetchAllOrganizations } from '@/api/organization';
import CategoriesTable from '@/components/CategoriesTable';
import AddCategoryForm from '@/components/forms/AddCategoryForm';
import SidebarPageLayout from '@/components/SidebarPageLayout';
import StickyHeader from '@/components/StickyHeader';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';

export default function Category() {
	const {
		data: categories,
		isLoading: cLoading,
		error: cError,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	});

	const {
		data: organizations,
		isLoading: oLoading,
		error: oError,
	} = useQuery({
		queryKey: ['organizations'],
		queryFn: fetchAllOrganizations,
	});

	if (cLoading || oLoading) {
		return <p>Loading...</p>;
	}

	if (cError || oError || !categories || !organizations) {
		return <p>Error</p>;
	}

	return (
		<SidebarPageLayout>
			<div className='mt-5' />
			<StickyHeader>
				<Header>Category Page</Header>
				<AddCategoryForm organizations={organizations} />
			</StickyHeader>
			<CategoriesTable categories={categories} />
		</SidebarPageLayout>
	);
}
