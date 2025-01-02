import type { Product } from "@prisma/client"

export interface ICartProduct extends Product {
	_id?: string
}

interface IStore {
	cart: ICartProduct[]
}

const state = reactive<IStore>({
	cart: [],
})

export default () => {
	const { cart } = toRefs(state)

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
	}
}
