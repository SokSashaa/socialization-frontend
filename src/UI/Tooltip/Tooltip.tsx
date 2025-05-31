import React, {FC, ReactNode, useState} from 'react';

import {PopoverPosition, PopoverSide} from '@UI/Popover';

import Popover from '../Popover/Popover';

interface TooltipProps {
	children: ReactNode;
	content?: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({children, content}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMouseLeave = () => {
		setAnchorEl(null);
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{content ? (
				content
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-gray-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
						clipRule="evenodd"
					/>
				</svg>
			)}
			<Popover
				isOpen={Boolean(anchorEl)}
				anchorElement={anchorEl}
				position={PopoverPosition.CENTER}
				side={PopoverSide.TOP}
				className="rounded-md p-4 border-2 border-main-yellow bg-blue-50 w-max max-w-72 z-50"
			>
				{children}
			</Popover>
		</div>
	);
};
