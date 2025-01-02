export default defineNuxtRouteMiddleware((to, from) => {
	const orderId = useCookie<{ id: string }>("orderId")

	if (orderId.value) {
		if (to.params.id !== orderId.value.id) {
			return navigateTo("/cart")
		}
	} else {
		return navigateTo("/cart")
	}
})
