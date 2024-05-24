import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

const LoginPage = () => {
	const { type } = useLocalSearchParams<{ type: string }>()
	const [loading, setLoading] = useState(false)
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')

	const onSignUpPress = async () => {}

	const onSignInPress = async () => {}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={70}
		>
			{loading && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<ActivityIndicator size={40} color={'black'} />
				</View>
			)}
			<Image
				source={require('../assets/images/logo-dark.png')}
				style={styles.logo}
			/>
			<Text style={styles.title}>
				{type === 'login' ? 'Welcome Back' : 'Create your account'}
			</Text>
			<View style={{ marginBottom: 30 }}>
				<TextInput
					autoCapitalize='none'
					placeholder='Email'
					style={styles.inputField}
					value={emailAddress}
					onChangeText={setEmailAddress}
				/>
				<TextInput
					placeholder='Password'
					style={styles.inputField}
					value={password}
					onChangeText={setPassword}
					autoCapitalize='none'
					secureTextEntry
				/>
			</View>
			{type === 'login' ? (
				<TouchableOpacity
					style={[defaultStyles.btn, styles.btnPrimary]}
					onPress={onSignInPress}
				>
					<Text style={styles.btnPrimaryText}>Login</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={[defaultStyles.btn, styles.btnPrimary]}
					onPress={onSignUpPress}
				>
					<Text style={styles.btnPrimaryText}>Create an Account</Text>
				</TouchableOpacity>
			)}
		</KeyboardAvoidingView>
	)
}

export default LoginPage

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 20
	},
	logo: {
		width: 60,
		height: 60,
		alignSelf: 'center',
		marginVertical: 80
	},
	title: {
		fontSize: 30,
		marginBottom: 20,
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 12,
		padding: 14,
		backgroundColor: 'white',
		fontSize: 20
	},
	btnPrimary: {
		backgroundColor: Colors.primary,
		marginVertical: 4
	},
	btnPrimaryText: {
		color: 'white',
		fontSize: 16
	}
})
