<script lang="ts">
	import HomeIcon from '~icons/material-symbols/home';
	import SearchIcon from '~icons/material-symbols/search';
	import ChatIcon from '~icons/material-symbols/chat-bubble';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
</script>

<div class="btm-nav">
	<button type="button" class="active">
		<HomeIcon class="text-xl" />
	</button>
	<button type="button" disabled>
		<SearchIcon class="text-xl" />
	</button>
	<button type="button" disabled>
		<ChatIcon class="text-xl" />
	</button>
	<button type="button">
		<NotificationsIcon class="text-xl" />
	</button>
	<button type="button">
		<ProfileIcon class="text-xl" />
	</button>
</div>