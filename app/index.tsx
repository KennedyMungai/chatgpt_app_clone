import AnimatedIntro from '@/components/animated-intro'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const HomePage = () => {
	return (
		<View style={styles.container}>
			<AnimatedIntro />
		</View>
	)
}

export default HomePage

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
