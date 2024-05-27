import HeaderDropdown from '@/components/header-dropdown'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Dalle = () => {
	const [gptVersion, setGptVersion] = useState('3.5')

	return (
		<View>
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
			<Text>Dalle</Text>
		</View>
	)
}

export default Dalle

const styles = StyleSheet.create({})
