import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, FlatList} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../../../assets/styles";

export const Users = ({projectId, permissions}) => {
    const [searchText, setSearchText] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    function onAdd() {

    }

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`http://192.168.1.191:5000/api/get_all_users_for_project_id/${projectId}`);
            const data = await response.json();
            setSearchText("");
            setAllUsers(data["users"]);
        } catch (e) {}
    };

    useEffect(() => {
        fetchAllUsers();
    }, [projectId]);

    const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {/*FILTROWANIE?*/}
                {/*<TouchableOpacity style={styles.filterButton}>*/}
                {/*    <MaterialIcons name="filter-list" size={24} color="white"/>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.filterButton} onPress={fetchAllUsers}>
                    <MaterialIcons name="refresh" size={24} color="white"/>
                </TouchableOpacity>
                {permissions["can_add_users"] &&
                    <TouchableOpacity style={styles.addButton2} onPress={onAdd}>
                        <MaterialIcons name="add" size={24} color="white"/>
                    </TouchableOpacity>}
            </View>
            <View>
                {filteredUsers.map((user) => (
                    <View key={user["email"]}>
                        <Text>{user["username"]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}