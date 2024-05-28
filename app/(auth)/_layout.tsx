import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AuthLayout = () => {
	const navigation = useNavigation()

	return (
		<Stack>
			<Stack.Screen name='(drawer)' options={{ headerShown: false }} />
			<Stack.Screen
				name='(modal)/settings'
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
					animationDuration: 100,
					headerShown: false,
					headerTitle: 'Settings',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Ionicons
								name='close-outline'
								size={24}
								color='black'
							/>
						</TouchableOpacity>
					)
				}}
			/>
		</Stack>
	)
}

export default AuthLayout
