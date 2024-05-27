import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity)

export type MessageInputProps = {
	onShouldSendMessage: (message: string) => void
}

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
	const [message, setMessage] = useState('')

	const expanded = useSharedValue(0)

	const expandItems = () => {}

	const collapseItems = () => {}

	const onSend = () => {
        onShouldSendMessage(message)
        setMessage('')
    }

	return (
		<BlurView intensity={90} style={{ padding: 16 }} tint='extraLight'>
			<View style={styles.row}>
				<AnimatedTouchableOpacity
					onPress={expandItems}
					style={[styles.roundBtn]}
				>
					<Ionicons name='add' size={24} color={Colors.grey} />
				</AnimatedTouchableOpacity>
				<TextInput
					autoFocus
					placeholder='Message'
					style={styles.messageInput}
					multiline
					value={message}
					onChangeText={setMessage}
					onFocus={collapseItems}
				/>
				{message.length > 0 ? (
					<TouchableOpacity onPress={onSend}>
						<Ionicons
							name='arrow-up-circle-outline'
							size={24}
							color={Colors.grey}
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity>
						<FontAwesome5
							name='headphones'
							size={24}
							color={Colors.grey}
						/>
					</TouchableOpacity>
				)}
			</View>
		</BlurView>
	)
}

export default MessageInput

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		backgroundColor: 'white'
	},
	roundBtn: {
		width: 30,
		height: 30,
		borderRadius: 20,
		backgroundColor: Colors.input,
		alignItems: 'center',
		justifyContent: 'center'
	},
	messageInput: {
		flex: 1,
		marginHorizontal: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 20,
		padding: 10,
		borderColor: Colors.greyLight,
		backgroundColor: Colors.light
	}
})
