import React, {FC, useState} from 'react';
import {useGetGameQuery} from '@app/api/common/gameApiSlice';

import {ErrorMessage} from '../../../../UI';
import Spinner from '../../../../UI/spinners/Spinner';

import styles from './GameWindow.module.scss';

const GameErrorBoundary: FC<{children: React.ReactNode; onError?: (error: Error) => void}> = ({
	children,
	onError,
}) => {
	const [hasError, setHasError] = React.useState(false);

	const errorHandler = React.useCallback(
		(error: Error) => {
			setHasError(true);
			onError?.(error);
		},
		[onError]
	);

	React.useEffect(() => {
		const errorListener = (event: ErrorEvent) => {
			errorHandler(event.error);
		};

		window.addEventListener('error', errorListener);

		return () => window.removeEventListener('error', errorListener);
	}, [errorHandler]);

	if (hasError) {
		return <ErrorMessage message="Game crashed. Please try reloading." className="mt-10" />;
	}

	return children;
};

const GameFrame: FC<{src: string}> = ({src}) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{isLoading && <Spinner className="m-auto my-4" />}

			<iframe
				sandbox="allow-scripts allow-same-origin allow-forms"
				className={styles.content}
				title="GameWindow"
				src={src}
				referrerPolicy="no-referrer"
				onLoad={() => setIsLoading(false)}
			/>
		</>
	);
};

interface GameWindowProps {
	gameId?: string;
}

const GameWindow: FC<GameWindowProps> = ({gameId}) => {
	const {data: game, isLoading, isError} = useGetGameQuery(gameId);

	const handleError = (error: Error) => {
		console.error('Game error:', error);
		// You can add additional error handling here, like reporting to a service
	};

	if (isLoading) {
		return <Spinner className="m-auto my-4" />;
	}

	if (isError) {
		return <ErrorMessage message="Ошибка загрузки игры" className="mt-10" />;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<GameErrorBoundary onError={handleError}>
					<GameFrame src={game?.link} />
				</GameErrorBoundary>
			</div>
		</div>
	);
};

export default GameWindow;
