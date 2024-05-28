import { Message, ROLE } from '@/utils/interfaces'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
	return (
		<View style={styles.row}>
			{role === ROLE.Bot ? (
				<View style={[styles.item]}>
					<Image
						source={require('@/assets/images/logo-white.png')}
						style={styles.btnImage}
					/>
				</View>
			) : (
				<Image
					source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }}
					style={styles.avatar}
				/>
			)}
			<Text style={styles.text}>{content}</Text>
		</View>
	)
}

export default ChatMessage

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 14,
		gap: 14,
		marginVertical: 12
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 15
	},
	btnImage: {
		margin: 6,
		width: 16,
		height: 16
	},
	item: {
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: 'black'
	},
	text: {
		padding: 4,
		fontSize: 16,
		flexWrap: 'wrap',
		flex: 1
	}
})
