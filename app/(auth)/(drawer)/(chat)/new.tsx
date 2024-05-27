import HeaderDropdown from '@/components/header-dropdown'
import { defaultStyles } from '@/constants/Styles'
import { useAuth } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'

const NewChatPage = () => {
	const [gptVersion, setGptVersion] = useState('3.5')

	const { signOut } = useAuth()

	return (
		<View style={defaultStyles.pageContainer}>
			<Stack.Screen
				options={{
					headerTitle: () => (
						<HeaderDropdown
							title='ChatGPT'
							items={[
								{ key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
								{ key: '4', title: 'GPT-4', icon: 'sparkles' }
							]}
							selected={gptVersion}
							onSelect={(key) => setGptVersion(key)}
						/>
					)
				}}
			/>
			<Button title='Sign Out' onPress={() => signOut()} />
		</View>
	)
}

export default NewChatPage

const styles = StyleSheet.create({})
