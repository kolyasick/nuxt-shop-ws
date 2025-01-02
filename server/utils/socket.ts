import { Server, ServerOptions, type Socket } from "socket.io"
import type { H3Event } from "h3"

const options: Partial<ServerOptions> = {
	path: "/api/socket.io",
	serveClient: false,
}

type Payload = {
	text: string
	room: string
}

export const io = new Server(options)

export function initSocket(event: H3Event) {
	// @ts-ignore
	io.attach(event.node.res.socket?.server)

	io.on("connection", (socket: Socket) => {
		console.log("WS CONNECTED")

		socket.on("sendMessage", (payload: Payload) => {
			io.to(payload.room).emit("getMessage", payload.text)
		})

		socket.on("joinRoom", (id: string) => {
			socket.join(id)
		})

		socket.on("disconnect", () => {})
	})
}
