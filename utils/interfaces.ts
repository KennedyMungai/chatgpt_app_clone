export enum ROLE {
	User = 0,
	Bot = 1
}

export interface Message {
	role: ROLE
	content: string
	imageUrl?: string
	prompt?: string
}

export interface Chat {
	id: number
	title: string
}
