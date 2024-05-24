import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Slot, Stack, router, useRouter, useSegments } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'

const CLERK_PUBLISHABLE_KEY = process.env
	.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key)
		} catch (error) {
			return null
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value)
		} catch (error) {
			return
		}
	}
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return <Slot />
	}

	return <RootLayoutNav />
}

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth()
	const segments = useSegments()

	if (!isLoaded) return <Slot />

	useEffect(() => {
		if (!isLoaded) return

		const inAuthGroup = segments[0] === '(auth)'

		if (isSignedIn && !inAuthGroup) {
			// Pushing the user into the authenticated group
			router.replace('/(auth)/')
		} else if (!isSignedIn && inAuthGroup) {
			// Pushing the user out of the authenticated group
			router.replace('/')
		}
	}, [isSignedIn])

	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen
				name='login'
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
					animationDuration: 200,
					title: '',
					headerStyle: {
						backgroundColor: 'white'
					},
					headerShadowVisible: false,
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name='close-outline' size={28} />
						</TouchableOpacity>
					)
				}}
			/>
			<Stack.Screen name='(auth)' options={{ headerShown: false }} />
		</Stack>
	)
}

const RootLayoutNav = () => {
	const router = useRouter()

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<InitialLayout />
			</GestureHandlerRootView>
		</ClerkProvider>
	)
}
