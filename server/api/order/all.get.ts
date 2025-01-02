import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const orders = await prisma.order.findMany({
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	})

	if (!orders) {
		throw createError({
			statusCode: 404,
			statusMessage: "Products not found",
		})
	}

	return orders
})
