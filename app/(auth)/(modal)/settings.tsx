import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Storage } from '@/utils/storage'
import { useAuth } from '@clerk/clerk-expo'
import React from 'react'
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

const SettingsPage = () => {
	const [key, setKey] = useMMKVString('apiKey', Storage)
	const [organization, setOrganization] = useMMKVString('org', Storage)

	const { signOut } = useAuth()

	const saveApiKey = () => {}

	return (
		<View style={styles.container}>
			{key && key !== '' && (
				<Text style={styles.label}>You are all set</Text>
			)}

			{(!key || key === '') && (
				<>
					<Text style={styles.label}>API Key & Organization</Text>
					<TextInput
						style={styles.input}
						value={key}
						onChangeText={setKey}
						placeholder='Enter your API key'
						autoCorrect={false}
						autoCapitalize='none'
					/>
					<TextInput
						style={styles.input}
						value={organization}
						onChangeText={setOrganization}
						placeholder='Your organization'
						autoCorrect={false}
						autoCapitalize='none'
					/>

					<TouchableOpacity
						style={[
							defaultStyles.btn,
							{ backgroundColor: Colors.primary }
						]}
						onPress={saveApiKey}
					>
						<Text style={styles.buttonText}>Save API Key</Text>
					</TouchableOpacity>
				</>
			)}

			<TouchableOpacity
				onPress={() => signOut()}
				style={{ marginTop: 8, borderRadius: 8 }}
			>
				<Text
					style={{
						alignSelf: 'center',
						fontSize: 20,
						fontWeight: '500'
					}}
				>
					Sign Out
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default SettingsPage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: 'white'
	},
	label: {
		fontSize: 18,
		marginBottom: 10
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginBottom: 20,
		backgroundColor: '#fff'
	},

	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16
	}
})
