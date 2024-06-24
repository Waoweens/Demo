<script lang="ts">
	import BackButton from "$components/BackButton.svelte";
	import IconAccount from "~icons/material-symbols/account-circle";
	import IconProfile from "~icons/material-symbols/id-card-outline";
</script>

<BackButton crumbs={['Settings']} />

<ul class="menu w-full menu-lg">
	<li>
		<a href="/settings/account">
			<IconAccount class="text-xl" />
			Account
		</a>
		<a href="/settings/profile">
			<IconProfile class="text-xl" />
			Profile
		</a>
	</li>
</ul>