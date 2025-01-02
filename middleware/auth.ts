export default defineNuxtRouteMiddleware((to, from) => {
	const { user } = useUserSession()

	if (!user.value || !user.value.isAdmin) {
		return navigateTo("/login")
	}
})
