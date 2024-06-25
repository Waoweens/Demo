import type { Writable } from 'svelte/store';
import SnowflakeGenerator from './snowflake';

export const snowflake = new SnowflakeGenerator(1);

export interface DatabaseUserAttributes {
	id: bigint
	username: string;
	createdAt: Date;
	displayName?: string | null;
	bio?: string | null;
	profileImage?: string | null;
	bannerImage?: string | null;
}

export type PassedUser = Writable<DatabaseUserAttributes | undefined>;

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

export class CFileList {
	private files: File[] = [];
	public length: number = this.files.length;

	constructor(files: File[]) {
		this.files = files;
	}

	public item(index: number): File | null {
		return this.files[index] || null;
	}
}