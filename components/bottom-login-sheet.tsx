import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BottomLoginSheet = () => {
	const { bottom } = useSafeAreaInsets()

	return (
		<View style={[styles.container, { paddingBottom: bottom }]}>
			<TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
				<Ionicons name='logo-google' size={16} style={styles.btnIcon} />
				<Text style={styles.btnLightText}>Continue with Google</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
				<Ionicons
					name='logo-apple'
					size={16}
					style={styles.btnIcon}
					color='white'
				/>
				<Text style={styles.btnDarkText}>Continue with Apple</Text>
			</TouchableOpacity>
			<Link
				href='/login'
				asChild
				style={[defaultStyles.btn, styles.btnDark]}
			>
				<TouchableOpacity>
					<Ionicons
						name='mail'
						size={20}
						style={styles.btnIcon}
						color='white'
					/>
					<Text style={styles.btnDarkText}>Sign in with Email </Text>
				</TouchableOpacity>
			</Link>
			<Link
				href='/login'
				asChild
				style={[defaultStyles.btn, styles.btnDark]}
			>
				<TouchableOpacity>
					<Text style={styles.btnDarkText}>Log in</Text>
				</TouchableOpacity>
			</Link>
		</View>
	)
}

export default BottomLoginSheet

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: 'black',
		padding: 26,
		gap: 14,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	btnLight: {
		backgroundColor: 'white'
	},
	btnIcon: {
		paddingRight: 6
	},
	btnLightText: {
		fontSize: 20
	},
	btnDark: {
		backgroundColor: Colors.grey
	},
	btnDarkText: {
		color: 'white',
		fontSize: 20
	},
	btnOutline: {
		borderWidth: 3,
		borderColor: Colors.grey
	}
})
