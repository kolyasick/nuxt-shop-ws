<script setup lang="ts">
const { fetch, user, clear, loggedIn } = useUserSession()

const email = ref("admin@mail.ru")
const password = ref("admin")

const login = async () => {
	const { data, error } = await useFetch("/api/login", {
		method: "POST",
		body: {
			email: email.value,
			password: password.value,
		},
	})

	if (!error.value) {
		await fetch()
	}

}
// clear()
watchEffect(async () => {
	if (loggedIn.value && user.value?.isAdmin) {
		await navigateTo("/admin")
	}
})
</script>

<template>
	<NuxtLayout name="auth-layout">
		<div class="w-full max-w-xs">
			<form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
						Email
					</label>
					<input
						v-model="email"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="Email"
						type="text"
						placeholder="Email" />
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
						Password
					</label>
					<input
						v-model="password"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="text"
						placeholder="******************" />
				</div>
				<div class="flex items-center justify-between">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Войти
					</button>
				</div>
			</form>
		</div>
	</NuxtLayout>
</template>

<style></style>
