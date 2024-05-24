import { useAuth } from '@clerk/clerk-expo'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

const AuthPage = () => {
	const { signOut } = useAuth()

	return (
		<View>
			<Button title='Sign Out' onPress={() => signOut()} />
		</View>
	)
}

export default AuthPage

const styles = StyleSheet.create({})
