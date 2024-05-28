import Colors from '@/constants/Colors'
import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

const PredefinedMessages = [
	{ title: 'Explain React Native', text: 'like i am 5' },
	{
		title: 'Suggest fun activities',
		text: 'for a family visiting San Francisco'
	},
	{
		title: 'Recommend a dish',
		text: 'to impress a date who is a picky eater'
	}
]

type Props = {
	onSelectCard: (message: string) => void
}

const MessageIdeas = ({ onSelectCard }: Props) => {
	return (
		<View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 20,
					gap: 16,
					paddingVertical: 10
				}}
			>
				{PredefinedMessages.map((message, index) => (
					<TouchableOpacity
						key={index}
						onPress={() =>
							onSelectCard(`${message.title} ${message.text}`)
						}
						style={styles.card}
					>
						<Text style={{ fontSize: 16, fontWeight: 500 }}>
							{message.title}
						</Text>
						<Text>{message.text}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)
}

export default MessageIdeas

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.input,
		padding: 14,
		borderRadius: 10
	}
})
