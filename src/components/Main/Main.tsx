import { ChildrenProps } from '../../types';

const Main = ({ children }: ChildrenProps) => {
	return (
		<div style={{ minHeight: 'calc(100vh - 64px)' }} className="flex justify-center bg-slate-50 relative">
			{children}
		</div>
	);
};

export default Main;
