<script setup lang="ts">
// import { io, Socket } from "socket.io-client"

const { data: products, error } = await useFetch("/api/product/all")

if (error.value) {
	console.log(error.value)
}

// const socket = ref<Socket>()

// onMounted(() => {
// 	socket.value = io({
// 		path: "/api/socket.io",
// 	})
// })
</script>

<template>
	<section class="container mx-auto flex items-center justify-center flex-col mt-5 gap-10">
		<h1 class="font-bold text-3xl">Магазин косметики Ещкере</h1>
		<NuxtLink class="border border-slate-500 px-2 py-1 rounded" to="/cart">В корзину</NuxtLink>
		<ul class="grid grid-cols-3 gap-3 place-items-center">
			<li v-for="product in products" :key="product.id">
				<Card :product="product" />
			</li>
		</ul>
	</section>
</template>

<style></style>
