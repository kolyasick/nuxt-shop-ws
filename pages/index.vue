<script setup lang="ts">
import type { LocationQueryValue } from "vue-router"

const { products } = useStore()

const { data, error } = await useFetch("/api/product/all")
if (error.value) {
	console.log(error.value)
} else {
	products.value = data.value || []
}

const { data: categories, error: cError } = await useFetch("/api/category/all")
if (cError.value) {
	console.log(cError.value)
}

const router = useRouter()
const route = useRoute()

const updateUrl = async (category: string) => {
	await router.push({
		query: {
			...route.query,
			category,
		},
	})
}

const fetchProducts = async (category: LocationQueryValue | LocationQueryValue[]) => {
	const { data, error } = await useFetch("/api/category/search", {
		params: {
			category,
		},
	})

	products.value = data.value || []
}

watch(
	() => route.query.category,
	(newSearch) => {
		fetchProducts(newSearch)
	},
	{ immediate: true }
)
</script>

<template>
	<section class="container mx-auto flex items-center justify-center flex-col mt-5 gap-10">
		<h1 class="font-bold text-3xl">Магазин косметики Ещкере</h1>
		<NuxtLink class="border border-slate-500 px-2 py-1 rounded" to="/cart">В корзину</NuxtLink>
		<div>
			<ul class="flex items-center gap-3">
				<li
					@click="updateUrl(category.title)"
					class="border cursor-pointer p-1 border-black rounded-md"
					v-for="category in categories"
					:key="category.id">
					{{ category.title }}
				</li>
			</ul>
		</div>
		<ul v-if="products.length > 1" class="grid grid-cols-3 gap-3 place-items-center">
			<li v-for="product in products" :key="product.id">
				<Card :product="product" />
			</li>
		</ul>
		<span v-else> Products not found :(</span>
	</section>
</template>

<style></style>
