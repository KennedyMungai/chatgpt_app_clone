import HeaderDropdown from '@/components/header-dropdown'
import MessageInput from '@/components/message-input'
import { defaultStyles } from '@/constants/Styles'
import { useAuth } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native'

const NewChatPage = () => {
	const [gptVersion, setGptVersion] = useState('3.5')

	const { signOut } = useAuth()

	const getCompletions = async (message: string) =>
		console.log('Getting completions for: ', message)

	return (
		<View style={defaultStyles.pageContainer}>
			<Stack.Screen
				options={{
					headerTitle: () => (
						<HeaderDropdown
							title='ChatGPT'
							items={[
								{ key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
								{ key: '4.0', title: 'GPT-4', icon: 'sparkles' }
							]}
							selected={gptVersion}
							onSelect={(key) => setGptVersion(key)}
						/>
					)
				}}
			/>
			<View style={{ flex: 1 }}>
				<Text>Dummy Content</Text>
				<Button title='Sign Out' onPress={() => signOut()} />
			</View>
			<KeyboardAvoidingView
				keyboardVerticalOffset={70}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%'
				}}
			>
				<MessageInput onShouldSendMessage={getCompletions} />
			</KeyboardAvoidingView>
		</View>
	)
}

export default NewChatPage

const styles = StyleSheet.create({})
