import type { Product } from "@prisma/client"

export interface ICartProduct extends Product {
	_id?: string
}

interface IStore {
	cart: ICartProduct[]
	products: Product[]
}

const state = reactive<IStore>({
	cart: [],
	products: [],
})

export default () => {
	const { cart, products } = toRefs(state)

	onMounted(() => {
		const localCart = localStorage.getItem("cart")
		cart.value = localCart ? JSON.parse(localCart) : []

		watch(
			cart,
			() => {
				localStorage.setItem("cart", JSON.stringify(cart.value))
			},
			{
				deep: true,
			}
		)
	})

	return {
		cart,
		products,
	}
}
