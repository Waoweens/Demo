import SnowflakeGenerator from './snowflake';

export const snowflake = new SnowflakeGenerator(1);
console.log(snowflake.generate());

export type TimelinePost = {
	id: bigint;
	content: string | null;
	createdAt: Date;
	yeahed?: boolean;
	author: {
		id: bigint;
		username: string;
		displayName: string | null;
		profileImage?: string | null;
	};
	_count: {
		yeahs: number;
		reposts: number;
		replies: number;
		quotes: number;
	};
};

export type ModalActions = {
	id: string;
	open: () => void;
	close: () => void;
};
