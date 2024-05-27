import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'

export type HeaderDropDownProps = {
	title: string
	selected?: string
	onSelect: (key: string) => void
	items: {
		key: string
		title: string
		icon: string
	}[]
}

const HeaderDropdown = ({
	title,
	items,
	onSelect,
	selected
}: HeaderDropDownProps) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 16
					}}
				>
					<Text style={{ fontWeight: '500', fontSize: 16 }}>
						{title}
					</Text>
					{selected && (
						<Text
							style={{
								fontWeight: '600',
								fontSize: 16,
								color: Colors.greyLight
							}}
						>
							{selected} &gt;
						</Text>
					)}
				</View>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{items.map((item) => (
					<DropdownMenu.Item
						key={item.key}
						onSelect={() => onSelect(item.key)}
					>
						<DropdownMenu.ItemTitle>
							{item.title}
						</DropdownMenu.ItemTitle>
						<DropdownMenu.ItemIcon androidIconName={item.icon} />
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}

export default HeaderDropdown

const styles = StyleSheet.create({})
