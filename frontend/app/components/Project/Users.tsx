import React, {useContext, useEffect, useState} from "react";
import {View, TouchableOpacity, FlatList, Image, Animated} from "react-native";
import {Button, Text, TextInput, Title} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../../../assets/styles";
import {storage} from "../../../api/store";
import ScrollView = Animated.ScrollView;
import {log} from "expo/build/devtools/logger";
import {PermissionModal} from "./PermissionModal";
import {Loading} from "../Loading";
import {projectContent} from "../../screens/ProjectScreen";


function UserInProjectDetails({user, goToProfileUser}) {
    return (
        <View style={styles.userDetails}>
            <Text style={styles.detailText}><Text
                style={styles.boldText}>Position:</Text> {user.position}</Text>
            <Text style={styles.detailText}><Text
                style={styles.boldText}>Description:</Text> {user.description}</Text>
            <Button mode="contained" style={styles.viewProfileButton}
                    onPress={() => goToProfileUser(user.email)}>View Profile</Button>
        </View>
    );
}

export const Users = ({navigation}) => {
    const {projectId, permissions} = useContext(projectContent);
    const api_host = storage((state) => state.api_host);
    const token = storage((state) => state.token);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [restUsers, setRestUsers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [creatorUser, setCreatorUser] = useState(null);
    const [permissionEditingUser, setPermissionEditingUser] = useState(null);
    const [positionEditingUser, setPositionEditingUser] = useState(null);
    const [emailEditingUser, setEmailEditingUser] = useState(null);

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
            setCreatorUser(data["creatorUser"]);
        } finally {
            setIsLoading(false);
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
        setExpandedUserId(expandedUserId === email ? null : email);
    };

    function goToProfileUser(email) {
        navigation.navigate('User', {email: email})
    }

    const openSettings = async (user) => {
        try {
            const response = await fetch(`${api_host}/get_permission_for_user_in_project/${user.email}/${projectId}`);
            const data = await response.json();
            setPermissionEditingUser(data["permission"]);
            setPositionEditingUser(user.position_in_project);
            setEmailEditingUser(user.email);
        } catch (e) {
        }
    }

    if (isLoading)
        return <Loading/>

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
            <ScrollView contentContainerStyle={styles.container3}>
                <Title style={styles.sectionTitle}>Users in project</Title>
                <View style={styles.usersContainer}>
                    {filteredUsers.map((user) => (
                        <TouchableOpacity
                            key={user.email}
                            style={styles.userCard}
                            onPress={() => toggleUserDetails(user.email)}
                        >
                            <View style={styles.userRow}>
                                <Image
                                    source={{uri: `${api_host.slice(0, -3)}/static/images/${user['img_path']}`}}
                                    style={styles.avatar}
                                />
                                <Text style={styles.userText}>{user.username}</Text>
                            </View>
                            {expandedUserId === user.email && (
                                <View style={styles.userDetails}>
                                    <Text style={styles.detailText}><Text
                                        style={styles.boldText}>Position:</Text> {user.position_in_project}</Text>
                                    <Text style={styles.detailText}><Text style={styles.boldText}>Date of
                                        join:</Text> {user.date_of_join}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Button mode="contained"
                                                style={styles.viewProfileButton}
                                                onPress={() => goToProfileUser(user.email)}>
                                            View Profile
                                        </Button>
                                        {permissions.can_edit_details_about_users && (
                                            <TouchableOpacity style={styles.settingsButton}
                                                              onPress={() => openSettings(user)}>
                                                <MaterialIcons name="settings" size={20} color="white"/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {permissions.can_add_users && (
                    <>
                        <Title style={styles.sectionTitle}>Users invited to project: </Title>
                        <View style={styles.usersContainer}>
                            {filteredInvitedUsers.map((user) => (
                                <TouchableOpacity
                                    key={user.email}
                                    style={[styles.userCard, styles.invitedUserCard]}
                                    onPress={() => toggleUserDetails(user.email)}
                                >
                                    <View style={styles.userRow}>
                                        <Image
                                            source={{uri: `${api_host.slice(0, -3)}/static/images/${user['img_path']}`}}
                                            style={styles.avatar}
                                        />
                                        <Text style={styles.userText}>{user.username}</Text>
                                        <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(user)}>
                                            <MaterialIcons name="remove" size={12} color="white"/>
                                        </TouchableOpacity>
                                    </View>
                                    {expandedUserId === user.email && (
                                        <View style={styles.userDetails}>
                                            <Text style={styles.detailText}><Text
                                                style={styles.boldText}>Position:</Text> {user.position}</Text>
                                            <Text style={styles.detailText}><Text
                                                style={styles.boldText}>Description:</Text> {user.description}</Text>
                                            <Button mode="contained" style={styles.viewProfileButton}
                                                    onPress={() => goToProfileUser(user.email)}>View Profile</Button>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Title style={styles.sectionTitle}>Rest users:</Title>
                        <View style={styles.usersContainer}>
                            {filteredRestUsers.map((user) => (
                                <TouchableOpacity
                                    key={user.email}
                                    style={styles.userCard}
                                    onPress={() => toggleUserDetails(user.email)}
                                >
                                    <View style={styles.userRow}>
                                        <Image
                                            source={{uri: `${api_host.slice(0, -3)}/static/images/${user['img_path']}`}}
                                            style={styles.avatar}
                                        />
                                        <Text style={styles.userText}>{user.username}</Text>
                                        <TouchableOpacity style={styles.addButtonUsersInProject}
                                                          onPress={() => onAdd(user)}>
                                            <MaterialIcons name="add" size={12} color="white"/>
                                        </TouchableOpacity>
                                    </View>
                                    {expandedUserId === user.email && (
                                        <UserInProjectDetails goToProfileUser={goToProfileUser} user={user}/>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
            {permissionEditingUser &&
                <PermissionModal
                    email={emailEditingUser}
                    projectId={projectId}
                    positionUser={positionEditingUser}
                    permissionEditingUser={permissionEditingUser}
                    visible={!!permissionEditingUser}
                    onClose={() => setPermissionEditingUser(null)}
                />
            }
        </View>
    );
}