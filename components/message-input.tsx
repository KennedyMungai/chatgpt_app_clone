import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity)

export type MessageInputProps = {
	onShouldSendMessage: (message: string) => void
}

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
	const [message, setMessage] = useState('')

	const expanded = useSharedValue(1)

	const expandItems = () => {
		expanded.value = withTiming(1, { duration: 400 })
	}

	const collapseItems = () => {
		expanded.value = withTiming(0, { duration: 400 })
	}

	const onChangeText = (text: string) => {
		collapseItems()

		setMessage(text)
	}

	const onSend = () => {
		onShouldSendMessage(message)
		setMessage('')
	}

	const expandedButtonStyle = useAnimatedStyle(() => {
		return {
			opacity: expanded.value
			// transform: [{ scale: expanded.value }]
		}
	})

	const buttonViewStyle = useAnimatedStyle(() => {
		return {
			opacity: 1
		}
	})

	return (
		<BlurView
			intensity={90}
			style={{ paddingVertical: 16 }}
			tint='extraLight'
		>
			<View style={styles.row}>
				<AnimatedTouchableOpacity
					onPress={expandItems}
					style={[styles.roundBtn, expandedButtonStyle]}
				>
					<Ionicons name='add' size={24} color={Colors.grey} />
				</AnimatedTouchableOpacity>

				<Animated.View style={[styles.buttonView, buttonViewStyle]}>
					<TouchableOpacity
						onPress={() => ImagePicker.launchCameraAsync()}
					>
						<Ionicons
							name='camera-outline'
							size={24}
							color={Colors.grey}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => ImagePicker.launchImageLibraryAsync()}
					>
						<Ionicons
							name='image-outline'
							size={24}
							color={Colors.grey}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => DocumentPicker.getDocumentAsync()}
					>
						<Ionicons
							name='folder-outline'
							size={24}
							color={Colors.grey}
						/>
					</TouchableOpacity>
				</Animated.View>

				<TextInput
					autoFocus
					placeholder='Message'
					style={styles.messageInput}
					multiline
					value={message}
					onChangeText={onChangeText}
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
	},
	buttonView: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12
	}
})
