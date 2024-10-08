import { PropsWithChildren } from 'react';

export default function SidebarPageLayout({ children }: PropsWithChildren) {
	return <div className='space-y-3 relative'>{children}</div>;
}
