<script setup lang="ts">
import { io, Socket } from "socket.io-client"
const { cart } = useStore()

definePageMeta({
	middleware: "order",
})

const route = useRoute()
const email = ref<string>("")
const phone = ref<string>("")
const firstName = ref<string>("")
const lastName = ref<string>("")
const address = ref<string>("")

const messages = ref<string[]>([])

const createOrder = async () => {
	const { data, error } = await useFetch("/api/order/create", {
		method: "POST",
		body: {
			email: email.value,
			phone: phone.value,
			firstName: firstName.value,
			lastName: lastName.value,
			address: address.value,
			products: cart.value,
		},
	})

	if (error.value) {
		console.log(error.value)
	} else {
		console.log(data.value)
	}
}

const socket = ref<Socket>()

onMounted(() => {
	socket.value = io({
		path: "/api/socket.io",
	})

	socket.value.emit("joinRoom", route.params.id)

	
	socket.value.on("getMessage", (response: string) => {
		messages.value.push(response)
	})
})
</script>
<template>
	<section class="gap-5 w-full min-h-screen flex">
		<div class="w-3/5 border border-slate-400 flex items-center flex-col gap-5 justify-center">
			<h1 class="font-bold text-3xl">Creating Order</h1>
			<form
				@submit.prevent="createOrder"
				class="max-w-md mx-auto border border-slate-500 p-10 rounded-xl">
				<div class="relative z-0 w-full mb-5 group">
					<input
						v-model="email"
						type="email"
						name="floating_email"
						id="floating_email"
						class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required />
					<label
						for="floating_email"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Email address</label
					>
				</div>
				<div class="grid md:grid-cols-2 md:gap-6">
					<div class="relative z-0 w-full mb-5 group">
						<input
							v-model="firstName"
							type="text"
							name="floating_first_name"
							id="floating_first_name"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required />
						<label
							for="floating_first_name"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>First name</label
						>
					</div>
					<div class="relative z-0 w-full mb-5 group">
						<input
							v-model="lastName"
							type="text"
							name="floating_last_name"
							id="floating_last_name"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required />
						<label
							for="floating_last_name"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>Last name</label
						>
					</div>
				</div>
				<div class="grid md:grid-cols-2 md:gap-6">
					<div class="relative z-0 w-full mb-5 group">
						<input
							v-model="phone"
							type="tel"
							name="floating_phone"
							id="floating_phone"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required />
						<label
							for="floating_phone"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>Phone number</label
						>
					</div>
					<div class="relative z-0 w-full mb-5 group">
						<input
							v-model="address"
							type="text"
							name="address"
							id="address"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required />
						<label
							for="address"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>Address</label
						>
					</div>
				</div>
				<button
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Submit
				</button>
			</form>

			<div>
				<ul>
					<li v-for="message in messages" :key="message">
						{{ message }}
					</li>
				</ul>
			</div>
		</div>
		<div class="w-2/5 border border-slate-400">
			<ul>
				<li v-for="product in cart" :key="product.id">
					<Card :product="product" />
				</li>
			</ul>
		</div>
	</section>
</template>

<style></style>
