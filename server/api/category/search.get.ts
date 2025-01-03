import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Query = {
	category: string
}

export default defineEventHandler(async (event) => {
	const query = getQuery<Query>(event)

	const products = await prisma.product.findMany({
		where: {
			category: {
				title: query.category,
			},
		},
	})

	return products || []
})
