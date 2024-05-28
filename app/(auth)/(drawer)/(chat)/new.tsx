import ChatMessage from '@/components/chat_message'
import HeaderDropdown from '@/components/header-dropdown'
import MessageIdeas from '@/components/message-ideas'
import MessageInput from '@/components/message-input'
import { defaultStyles } from '@/constants/Styles'
import { Message, ROLE } from '@/utils/interfaces'
import { Storage } from '@/utils/storage'
import { FlashList } from '@shopify/flash-list'
import { Redirect, Stack } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View
} from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import OpenAI from 'react-native-openai'

const NewChatPage = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const [height, setHeight] = useState(0)

	const [key, setKey] = useMMKVString('apiKey', Storage)
	const [organization, setOrganization] = useMMKVString('org', Storage)
	const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage)

	if (!key || key === '' || !organization || organization === '')
		return <Redirect href='/(auth)/(modal)/settings' />

	const openAI = useMemo(() => new OpenAI({ apiKey: key, organization }), [])

	const getCompletions = async (message: string) => {
		console.log('Getting completions for: ', message)

		if (messages.length === 0) {
			// TODO: Create chat later, store to DB
		}

		setMessages([
			...messages,
			{ content: message, role: ROLE.User },
			{ role: ROLE.Bot, content: '' }
		])

		openAI.chat.stream({
			messages: [{ role: 'user', content: message }],
			model: gptVersion === '4' ? 'gpt-4' : 'gpt-3.5-turbo'
		})
	}

	useEffect(() => {
		const handleMessage = (payload: any) =>
			console.log('Received message ', payload)

		openAI.chat.addListener('onChatMessageReceived', handleMessage)

		return () => openAI.chat.removeListener('onChatMessageReceived')
	}, [openAI])
	

	const onLayout = (event: any) => {
		const { height } = event.nativeEvent.layout
		setHeight(height)
	}

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			// setKeyboardStatus('Keyboard Shown')
			console.log('Keyboard Shown')
		})
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			// setKeyboardStatus('Keyboard Hidden')
			console.log('Keyboard Hidden')
		})

		return () => {
			showSubscription.remove()
			hideSubscription.remove()
		}
	}, [])

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
			<View style={{ flex: 1 }} onLayout={onLayout}>
				{messages.length === 0 && (
					<View
						style={[
							styles.logoContainer,
							{ marginTop: height / 2 - 100 }
						]}
					>
						<Image
							source={require('@/assets/images/logo-white.png')}
							style={styles.image}
							resizeMode='contain'
						/>
					</View>
				)}

				<FlashList
					data={messages}
					renderItem={({ item }) => <ChatMessage {...item} />}
					estimatedItemSize={400}
					contentContainerStyle={{
						paddingBottom: 150,
						paddingTop: 30
					}}
					keyboardDismissMode='on-drag'
				/>
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
				{messages.length === 0 && (
					<MessageIdeas onSelectCard={getCompletions} />
				)}
				<MessageInput onShouldSendMessage={getCompletions} />
			</KeyboardAvoidingView>
		</View>
	)
}

export default NewChatPage

const styles = StyleSheet.create({
	logoContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: 'black'
	},
	image: {
		width: 30,
		height: 30,
		resizeMode: 'cover'
	}
})
