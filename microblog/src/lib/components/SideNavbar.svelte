<script lang="ts">
	import HomeIcon from '~icons/material-symbols/home';
	import SearchIcon from '~icons/material-symbols/search';
	import ChatIcon from '~icons/material-symbols/chat-bubble';
	import NotificationsIcon from '~icons/material-symbols/notifications';
	import ProfileIcon from '~icons/material-symbols/person';
</script>

<div class="h-full flex flex-col justify-between">
	<ul class="menu gap-4">
		<li>
			<button type="button" class="active">
				<HomeIcon class="text-xl" />
				<span>Home</span>
			</button>
		</li>
		<li>
			<button type="button">
				<SearchIcon class="text-xl" />
				<span>Search</span>
			</button>
		</li>
		<li>
			<button type="button">
				<ChatIcon class="text-xl" />
				<span>Chat</span>
			</button>
		</li>
		<li>
			<button type="button">
				<NotificationsIcon class="text-xl" />
				<span>Notifications</span>
			</button>
		</li>
		<li>
			<button type="button">
				<ProfileIcon class="text-xl" />
				<span>Profile</span>
			</button>
		</li>
	</ul>
</div>