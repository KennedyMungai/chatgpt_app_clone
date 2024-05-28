import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const AuthLayout = () => {
	const router = useRouter()

	return (
		<Stack>
			<Stack.Screen name='(drawer)' options={{ headerShown: false }} />
			<Stack.Screen
				name='(modal)/settings'
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
					animationDuration: 100,
					headerTitle: 'Settings',
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerLeft: () => (
						<>
							{router.canGoBack() && (
								<TouchableOpacity onPress={() => router.back()}>
									<Ionicons
										name='close-outline'
										size={30}
										color='black'
									/>
								</TouchableOpacity>
							)}
						</>
					)
				}}
			/>
		</Stack>
	)
}

export default AuthLayout
