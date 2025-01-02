<script setup lang="ts">
import { io, Socket } from "socket.io-client"
definePageMeta({
	middleware: "auth",
})

const text = ref<string>("")

const { data: orders, error } = await useFetch("/api/order/all")

if (error.value) {
	console.log(error.value)
} else {
	console.log(orders.value)
}

const socket = ref<Socket>()

onMounted(() => {
	socket.value = io({
		path: "/api/socket.io",
	})
})

const sendMessage = () => {
	socket.value?.emit("sendMessage", {text: text.value, room: "93ed40b2-542e-4a24-b06f-f9508d071ebf",})
}
</script>
<template>
	<h1 class="text-4xl font-bold text-center w-full">ADMIN PANEL</h1>
	<div class="container mx-auto mt-5">
		<ul class="grid grid-cols-4 gap-3">
			<li
				v-for="order in orders"
				:key="order.id"
				class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Почта: {{ order.email }}
				</h5>
				<p>Телефон: {{ order.phone }}</p>
				<p class="font-normal text-gray-700 dark:text-gray-400">
					Aдрес: {{ order.address }}
				</p>
				<p>Дата создания: {{ order.created_at }}</p>
			</li>
		</ul>
		<div class="mt-10">
			<form @submit.prevent="sendMessage" class="max-w-sm mx-auto">
				<div class="mb-5">
					<input
						v-model="text"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Text"
						required />
				</div>
				<button
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Send
				</button>
			</form>
		</div>
	</div>
</template>

<style></style>
