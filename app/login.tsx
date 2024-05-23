import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoginPage = () => {
	return (
		<View style={styles.container}>
			<Text>Login</Text>
		</View>
	)
}

export default LoginPage

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	}
})
