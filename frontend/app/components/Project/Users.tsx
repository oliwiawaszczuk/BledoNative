import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, FlatList, Image} from "react-native";
import {Button, Text, TextInput, Title} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../../../assets/styles";
import {storage} from "../../../api/store";

export const Users = ({projectId, permissions, navigation}) => {
    const token = storage((state) => state.token);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [restUsers, setRestUsers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);

    const onAdd = async (user) => {
        try {
            const response = await fetch(`http://192.168.1.191:5000/api/invite_user_to_project/${projectId}/${user["email"]}/${token}`);
            const data = await response.json();
            if (response.ok) {
                setRestUsers(restUsers.filter(userF => userF !== user))
                setInvitedUsers([...invitedUsers, user])
            }
        } catch (e) {
        }
    }

    const onRemove = async (user) => {
        try {
            const response = await fetch(`http://192.168.1.191:5000/api/remove_invite_to_project/${projectId}/${user["email"]}`);
            const data = await response.json();
            if (response.ok) {
                setInvitedUsers(invitedUsers.filter(userF => userF !== user))
                setRestUsers([...restUsers, user])
            }
        } catch (e) {
        }
    }

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`http://192.168.1.191:5000/api/get_all_users_for_project_id/${projectId}`);
            const data = await response.json();
            setSearchText("");
            setAllUsers(data["users"]);
            setRestUsers(data["restUsers"]);
            setInvitedUsers(data["invitedUsers"]);
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [projectId]);

    const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredRestUsers = restUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredInvitedUsers = invitedUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    const toggleUserDetails = (email) => {
        // If the user is already expanded, collapse it, otherwise expand the clicked user
        setExpandedUserId(expandedUserId === email ? null : email);
    };

    function goToProfileUser(email) {
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
                {/*FILTROWANIE?*/}
                {/*<TouchableOpacity style={styles.filterButton}>*/}
                {/*    <MaterialIcons name="filter-list" size={24} color="white"/>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.filterButton} onPress={fetchAllUsers}>
                    <MaterialIcons name="refresh" size={24} color="white"/>
                </TouchableOpacity>
            </View>
            <Title>Users in project</Title>
            <View style={styles.usersContainer}>
                {filteredUsers.map((user) => (
                    <TouchableOpacity
                        key={user.email}
                        style={styles.userCard}
                        onPress={() => toggleUserDetails(user.email)}
                    >
                        <View style={styles.userRow}>
                            <Image source={{uri: `http://192.168.1.191:8081/assets/images/${user['img_path']}`}}
                                   style={styles.avatar}/>
                            <Text style={styles.userText}>{user.username}</Text>
                            {user.canRemove && (
                                <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(user)}>
                                    <MaterialIcons name="remove" size={16} color="white"/>
                                </TouchableOpacity>
                            )}
                        </View>
                        {expandedUserId === user.email && (
                            <View style={styles.userDetails}>
                                <Text style={styles.detailText2}><Text
                                    style={{fontWeight: 'bold'}}>Position:</Text> {user.position}</Text>
                                <Text style={styles.detailText2}><Text
                                    style={{fontWeight: 'bold'}}>Description:</Text> {user.description}</Text>
                                <Button mode="contained" onPress={() => goToProfileUser(user.email)}>View
                                    Profile</Button>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {permissions.can_add_users && (
                <View>
                    <Title>Users invited to project</Title>
                    <View style={styles.usersContainer}>
                        {filteredInvitedUsers.map((user) => (
                            <TouchableOpacity
                                key={user.email}
                                style={[styles.userCard, styles.invitedUserCard]}
                                onPress={() => toggleUserDetails(user.email)}
                            >
                                <View style={styles.userRow}>
                                    <Image source={{uri: `http://192.168.1.191:8081/assets/images/${user['img_path']}`}}
                                           style={styles.avatar}/>
                                    <Text style={styles.userText}>{user.username}</Text>
                                    <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(user)}>
                                        <MaterialIcons name="remove" size={12} color="white"/>
                                    </TouchableOpacity>
                                </View>
                                {expandedUserId === user.email && (
                                    <View style={styles.userDetails}>
                                        <Text style={styles.detailText2}><Text
                                            style={{fontWeight: 'bold'}}>Position:</Text> {user.position}</Text>
                                        <Text style={styles.detailText2}><Text
                                            style={{fontWeight: 'bold'}}>Description:</Text> {user.description}</Text>
                                        <Button mode="contained" onPress={() => goToProfileUser(user.email)}>View
                                            Profile</Button>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>


                    <Title>Rest users:</Title>
                    <View style={styles.usersContainer}>
                        {filteredRestUsers.map((user) => (
                            <TouchableOpacity
                                key={user.email}
                                style={styles.userCard}
                                onPress={() => toggleUserDetails(user.email)}
                            >
                                <View style={styles.userRow}>
                                    <Image source={{uri: `http://192.168.1.191:8081/assets/images/${user['img_path']}`}}
                                           style={styles.avatar}/>
                                    <Text style={styles.userText}>{user.username}</Text>
                                    <TouchableOpacity style={styles.addButton2} onPress={() => onAdd(user)}>
                                        <MaterialIcons name="add" size={12} color="white"/>
                                    </TouchableOpacity>
                                </View>
                                {expandedUserId === user.email && (
                                    <View style={styles.userDetails}>
                                        <Text style={styles.detailText2}><Text
                                            style={{fontWeight: 'bold'}}>Position:</Text> {user.position}</Text>
                                        <Text style={styles.detailText2}><Text
                                            style={{fontWeight: 'bold'}}>Description:</Text> {user.description}</Text>
                                        <Button mode="contained" onPress={() => goToProfileUser(user.email)}>View
                                            Profile</Button>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}