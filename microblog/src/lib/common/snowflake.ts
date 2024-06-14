class Snowflake {
	private epoch: number;
	private machineId: number;
	private sequence: number;
	private lastTimestamp: number;

	constructor(machineId: number) {
		this.epoch = 1577836800000; // Example epoch (January 1, 2020)
		this.machineId = machineId;
		this.sequence = 0;
		this.lastTimestamp = -1;
	}

	private currentTimestamp(): number {
		return Date.now();
	}

	private waitNextMillis(lastTimestamp: number): number {
		let timestamp = this.currentTimestamp();
		while (timestamp <= lastTimestamp) {
			timestamp = this.currentTimestamp();
		}
		return timestamp;
	}

	public nextId(): string {
		let timestamp = this.currentTimestamp();

		if (timestamp < this.lastTimestamp) {
			throw new Error('Clock moved backwards. Refusing to generate id');
		}

		if (timestamp === this.lastTimestamp) {
			this.sequence = (this.sequence + 1) & 0xfff; // 12 bits sequence
			if (this.sequence === 0) {
				timestamp = this.waitNextMillis(this.lastTimestamp);
			}
		} else {
			this.sequence = 0;
		}

		this.lastTimestamp = timestamp;

		const id = ((timestamp - this.epoch) << 22) | (this.machineId << 12) | this.sequence;

		return id.toString();
	}
}
