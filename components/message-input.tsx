import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type MessageInputProps = {
	onShouldSendMessage: (message: string) => void
}

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
	return (
		<View>
			<Text>MessageInput</Text>
		</View>
	)
}

export default MessageInput

const styles = StyleSheet.create({})
