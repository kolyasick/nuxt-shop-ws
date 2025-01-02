import type { User as PrismaUser } from "@prisma/client"

declare module "#auth-utils" {
	interface User extends PrismaUser {
	}
}

export {}
