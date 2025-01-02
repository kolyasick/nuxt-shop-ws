<script setup lang="ts">
import { v4 } from "uuid"

const { cart } = useStore()

const orderId = useCookie<{ id: string }>("orderId")

const createOrder = async () => {
	const id = v4()
	orderId.value = { id: id }
	await navigateTo(`/order/${id}`)
}
</script>

<template>
	<section class="container mx-auto flex items-center justify-center flex-col my-5 gap-10">
		<h1 class="font-bold text-3xl">КОРЗИНА ТОВАРОВ</h1>
		<NuxtLink class="border border-slate-500 px-2 py-1 rounded" to="/">Главная</NuxtLink>
		<ul class="grid grid-cols-4 gap-3 place-items-center">
			<li v-for="product in cart" :key="product.id">
				<Card :product="product" />
			</li>
		</ul>
		<button
			@click="createOrder"
			class="text-white self-end bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">
			Create order
		</button>
	</section>
</template>

<style></style>
