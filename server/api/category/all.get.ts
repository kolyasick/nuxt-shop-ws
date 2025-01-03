import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const categories = await prisma.category.findMany()

	if (!categories) {
		throw createError({
			statusCode: 404,
			statusMessage: "Categories not found",
		})
	}

	return categories
})
