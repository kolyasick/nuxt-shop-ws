import { User } from "@prisma/client"

export function sanitizeUser(user: User) {
	// @ts-ignore
	delete user.password

	return user
}
