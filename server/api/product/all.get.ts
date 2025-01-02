import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const products = await prisma.product.findMany()

	if (!products) {
		throw createError({
			statusCode: 404,
			statusMessage: "Products not found",
		})
	}

	return products
})
