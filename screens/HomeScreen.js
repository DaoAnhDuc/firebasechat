import React from 'react';
import { SafeAreaView, Dimensions, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import User from '../User';
import firebase from 'firebase';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
// import { TextInput } from 'react-native-gesture-handler';
// import styles from '../constants/style';

import ChatScreen from './ChatScreen'

export default class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Chats',
			headerRight: (
				<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
					<Image
						style={{ width: 32, height: 32, marginRight: 10, resizeMode: 'cover', tintColor: '#999' }}
						source={require('../images/user.png')}
					/>
				</TouchableOpacity>
			),
		};
	};

	state = {
		users: [],
		dbRef: firebase.database().ref('users'),
		messageList: [],
		dbRefMess: firebase.database().ref('messages'),
	};
	componentDidMount() {
		this.state.dbRef.on('child_added', (val) => {
			let person = val.val();
			person.username = val.key;
			var lists;
			if (person.username === User.username) {
				User.name = person.name;
			} else {
				this.setState((prevState) => {
					return {
						users: [...prevState.users, person],
					};
				});
			}
		});
	}
	// getMessageLast = (user2)=>{
	// 	this.state.dbRefMess
	// 		.child(User.username)
	// 		// .child(user2)
	// 		.on('child_added', (value) => {
	// 			this.setState((prevState) => {
	// 				return {
	// 					messageList: [...prevState.messageList, value.val()],
	// 				};
	// 			});
	// 		});
	// 	console.log(user2);
	// 	console.log(this.state.messageList);
		
	// 	// return this.state.messageList[this.state.messageList.length- 1];
	// 	// return this.state.messageList.length;
	// 	return this.state.messageList.length;
	// }
	componentWillUnmount() {
		this.state.dbRef.off();
	}
	renderItem = ({ item }) => (
		<TouchableOpacity
				onPress={() => this.props.navigation.navigate('Chat', item)}
				style={{borderBottomColor: '#ccc'}}
			>
			<ListItem
				title={item.name}
				// subtitle={this.getMessageLast(item.username)}
				subtitle={item.username}
				leftAvatar={{ source: { uri: item.avatar } }}
				bottomDivider
				chevron
			/>
		</TouchableOpacity>
	)
	_logOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};
	render() {
		const { height } = Dimensions.get('window');
		return (
			<SafeAreaView>
				<FlatList
					data={this.state.users}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.username}
					// leftAvatar={{source :{ uri: item.avatar  } }}
				/>
			</SafeAreaView>
		);
	}
}

// import { Avatar, ListItem } from 'react-native-elements';
// import React from 'react';
// import { SafeAreaView, Dimensions, Image, Text, FlatList, TouchableOpacity } from 'react-native';

// // Standard Avatar
// export default class HomeScreen extends React.Component {
// 	state={
// 		users:['user1','user2', 'user3', 'user4']
// 	}
// 	render() {
// 		return (
// 			<SafeAreaView>
// 				{/* <Avatar
// 					rounded
// 					size="medium"
// 					showAccessory
// 					onPress={() => console.log('Works!')}
// 					activeOpacity={0.7}
// 					title="Tự"
// 					icon={{ name: 'user', type: 'font-awesome' }}
// 					// containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
// 					source={{
// 						uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
// 					}}
// 				/> */}
// 				<ListItem
// 					leftAvatar={{
// 						title:'test',
// 						source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
// 						showAccessory: true,
// 					}}
// 					title={[...this.state.users]}
// 					subtitle={'true'}
// 					chevron
// 				/>
// 				<ListItem
// 					leftAvatar={{
// 						title: 'Tự',
// 						source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' },
// 						// showAccessory: true,
// 					}}
// 					title={'test'}
// 					subtitle={'true'}
// 					chevron
// 				/>
// 			</SafeAreaView>
// 		);
// 	}
// }
