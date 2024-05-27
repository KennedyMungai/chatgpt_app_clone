import Colors from '@/constants/Colors'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import {
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { Link, useNavigation } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const CustomDrawerContent = (props: any) => {
	const { top, bottom } = useSafeAreaInsets()

	return (
		<View style={{ flex: 1, marginTop: top, marginBottom: bottom }}>
			<View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
				<View style={styles.searchSection}>
					<Ionicons
						style={styles.searchIcon}
						name='search'
						size={20}
					/>
					<TextInput
						placeholder='Search'
						underlineColorAndroid={'transparent'}
						style={styles.input}
					/>
				</View>
			</View>
			<DrawerContentScrollView
				contentContainerStyle={{ paddingTop: 0 }}
				{...props}
			>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<View style={{ padding: 16 }}>
				<Link href={'/(auth)/(modal)/settings'} asChild>
					<TouchableOpacity style={styles.footer}>
						<Image
							source={{
								uri: 'https://galaxies.dev/img/meerkat_2.jpg'
							}}
							style={styles.avatar}
						/>
						<Text style={styles.userName}>Mika Meerkat</Text>
						<Ionicons
							name='ellipsis-horizontal'
							size={24}
							color={Colors.greyLight}
						/>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	)
}

const DrawerLayout = () => {
	const navigation = useNavigation()
	const dimensions = useWindowDimensions()

	return (
		<Drawer
			drawerContent={CustomDrawerContent}
			screenOptions={{
				headerLeft: () => (
					<TouchableOpacity
						onPress={() =>
							navigation.dispatch(DrawerActions.toggleDrawer)
						}
						style={{ marginLeft: 16 }}
					>
						<FontAwesome6
							name='grip-lines'
							size={20}
							color={Colors.grey}
						/>
					</TouchableOpacity>
				),
				headerStyle: { backgroundColor: Colors.light },
				headerShadowVisible: false,
				drawerActiveBackgroundColor: Colors.selected,
				overlayColor: 'rgba(0, 0, 0, 0.2)',
				drawerItemStyle: { borderRadius: 12 },
				drawerLabelStyle: { marginLeft: -20 },
				drawerStyle: { width: dimensions.width * 0.86 }
			}}
		>
			<Drawer.Screen
				name='(chat)/new'
				options={{
					title: 'ChatGPT',
					headerTitleAlign: 'center',
					drawerIcon: () => (
						<View
							style={[styles.item, { backgroundColor: '#333' }]}
						>
							<Image
								source={require('@/assets/images/logo-white.png')}
								style={styles.btnImage}
							/>
						</View>
					),
					headerRight: () => (
						<Link href='/(auth)/(drawer)/(chat)/new' push asChild>
							<TouchableOpacity>
								<Ionicons
									name='create-outline'
									size={24}
									color={Colors.grey}
									style={{ marginRight: 16 }}
								/>
							</TouchableOpacity>
						</Link>
					)
				}}
			/>
			<Drawer.Screen
				name='dalle'
				options={{
					title: 'Dall·E',
					drawerIcon: () => (
						<View style={[styles.item]}>
							<Image
								source={require('@/assets/images/dalle.png')}
								style={styles.dallEImage}
							/>
						</View>
					)
				}}
			/>
			<Drawer.Screen
				name='explorer'
				options={{
					title: 'Explore GPTs',
					drawerIcon: () => (
						<View style={[styles.exploreItem]}>
							<Ionicons name='apps-outline' size={18} />
						</View>
					)
				}}
			/>
		</Drawer>
	)
}

export default DrawerLayout

const styles = StyleSheet.create({
	item: {
		borderRadius: 15,
		overflow: 'hidden'
	},
	btnImage: {
		width: 16,
		height: 16,
		margin: 6
	},
	dallEImage: {
		width: 28,
		height: 28,
		resizeMode: 'cover'
	},
	exploreItem: {
		backgroundColor: 'white',
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	searchSection: {
		marginHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.input,
		borderRadius: 10,
		height: 34
	},
	searchIcon: {
		padding: 6
	},
	input: {
		flex: 1,
		paddingVertical: 8,
		paddingRight: 8,
		paddingLeft: 0,
		alignItems: 'center',
		color: '#424242'
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 10
	},
	userName: {
		fontSize: 16,
		fontWeight: '600',
		flex: 1
	}
})
