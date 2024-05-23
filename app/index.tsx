import AnimatedIntro from '@/components/animated-intro'
import BottomLoginSheet from '@/components/bottom-login-sheet'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const HomePage = () => {
	return (
		<View style={styles.container}>
			<AnimatedIntro />
			<BottomLoginSheet />
		</View>
	)
}

export default HomePage

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
