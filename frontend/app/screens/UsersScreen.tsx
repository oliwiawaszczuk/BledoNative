import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, FlatList, Image} from "react-native";
import {Text, TextInput, Title} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {storage} from "../../api/store";
import {styles} from "../../assets/styles";

export const UsersScreen = ({navigation}) => {
    const token = storage((state) => state.token);
    const api_host = storage((state) => state.api_host);
    const [searchText, setSearchText] = useState('');
    const [allUsers, setAllUsers] = useState([]);


    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${api_host}/get_all_users`);
            const data = await response.json();
            setSearchText("");
            setAllUsers(data["users"]);
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    function changeScreen(email) {
        navigation.navigate('User', {email: email})
    }

    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.filterButton} onPress={fetchAllUsers}>
                    <MaterialIcons name="refresh" size={24} color="white"/>
                </TouchableOpacity>
            </View>
            {filteredUsers.map((user) => (
                <TouchableOpacity key={user["email"]} style={styles.userContainer} onPress={() => changeScreen(user["email"])}>
                    <Image source={{uri: `${api_host.slice(0, -3)}/static/images/${user['img_path']}`}}
                           style={styles.avatar}/>
                    <Text style={styles.userText}>{user.username}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}