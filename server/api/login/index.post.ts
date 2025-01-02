import { PrismaClient } from "@prisma/client"
import { sanitizeUser } from "~/server/utils/sanitizeUser"

const prisma = new PrismaClient()

type Body = {
	email: string
	password: string
}

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody<Body>(event)

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	if (!user || user.password !== password) {
		throw createError({
			statusCode: 400,
			statusMessage: `Invalid credentials`,
		})
	}

	if (user && user.password === password) {
		await setUserSession(event, {
			user: user,
		})

		return sanitizeUser(user)
	}
})
