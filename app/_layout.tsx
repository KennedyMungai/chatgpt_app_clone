import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import 'react-native-reanimated'

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
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const router = useRouter()

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
		</Stack>
	)
}
