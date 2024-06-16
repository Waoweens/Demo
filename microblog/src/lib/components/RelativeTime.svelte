<script lang="ts">
	import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns';

	export let date: Date;
	const now = new Date()

	// if the date is less than 1 day ago, show the relative time
	// otherwise, if the year is the same as current year, show MMM dd
	// otherwise, show MMM dd, yyyy
	let formattedDate: string;
	if (differenceInDays(now, date) < 1) {
		formattedDate = formatDistanceToNowStrict(date, { addSuffix: true });
	} else if (now.getFullYear() === date.getFullYear()) {
		formattedDate = format(date, 'MMM dd');
	} else {
		formattedDate = format(date, 'MMM dd, yyyy');
	}
</script>

<time datetime={date.toISOString()}>{formattedDate}</time>