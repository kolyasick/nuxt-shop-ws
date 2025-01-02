import { PrismaClient, Product } from "@prisma/client"

const prisma = new PrismaClient()

interface IBody {
	email: string
	phone: string
	firstName: string
	lastName: string
	address: string
	products: Product[]
}

export default defineEventHandler(async (event) => {
	const { address, email, firstName, lastName, products, phone } = await readBody<IBody>(event)

	const order = await prisma.order.create({
		data: {
			address: address,
			phone: phone,
			email: email,
			first_name: firstName,
			last_name: lastName,
			user_id: 1,
		},
	})

	if (!order) {
		throw createError({
			statusCode: 400,
			statusMessage: "Order was not created",
		})
	}

	const orderProducts = products.forEach(async (product) => {
		const orderItem = await prisma.orderItem.create({
			data: {
				order_id: order.id,
				product_id: product.id,
			},
		})
	})

	return `Заказ успешно создан. Номер заказа - №-${order.id}`
})
