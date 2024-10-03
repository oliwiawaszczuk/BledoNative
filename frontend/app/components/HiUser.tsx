import {Button, Text, TextInput} from "react-native-paper";
import {Animated, LayoutAnimation, Modal, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {styles} from "../../assets/styles";
import {getCurrentDateTime} from "../../assets/time";
import {storage} from "../../api/store";
import Logout from "./Logout";

export const HiUser = ({userDetails}) => {
    const api_host = storage((state) => state.api_host);
    const token = storage((state) => state.token);
    const avatar_path = `${api_host.slice(0, -3)}/static/images/${userDetails['img_path']}`;

    const [isVisibleDetails, setIsVisibleDetails] = useState(false);
    const toggleVisibility = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisibleDetails(!isVisibleDetails);
    };

    const avatarOpacity = useRef(new Animated.Value(0)).current;
    const avatarScale = useRef(new Animated.Value(0.5)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(10)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(avatarOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(avatarScale, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(textTranslateY, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userDetails['username']);
    const [position, setPosition] = useState(userDetails['position']);
    const [description, setDescription] = useState(userDetails['description']);

    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000); // Update time every second

        return () => clearInterval(interval);
    }, []);

    const change_user_info = async () => {
        try {
            const response = await fetch(`${api_host}/change_user_info/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, position, description})
            });

            if (response.ok) {
                setIsEditing(false);
            }
        } catch (e) {

        }
    }

    return (
        <TouchableOpacity onPress={toggleVisibility} style={styles.rowContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={{uri: avatar_path}}
                        style={[
                            styles.userImage,
                            {
                                opacity: avatarOpacity,
                                transform: [{scale: avatarScale}],
                            },
                        ]}
                    />
                </View>
                <Animated.View
                    style={[
                        styles.textContainer2,
                        {
                            opacity: textOpacity,
                            transform: [{translateY: textTranslateY}],
                        },
                    ]}
                >
                    <Text style={styles.greetingText}>Hi, {username}</Text>
                    <View style={styles.dateCont}>
                        <Text style={styles.timeText}>{currentDateTime["time"]}</Text>
                        <Text style={styles.dateText}>{currentDateTime["date"]}</Text>
                    </View>
                </Animated.View>
            </View>

            {isVisibleDetails && (
                <Animated.View style={[ styles.detailsContainer ]}>
                    <Text style={styles.detailTitle}>Position:</Text>
                    <Text style={styles.detailText}>{position}</Text>
                    <Text style={styles.detailTitle}>Description:</Text>
                    <Text style={styles.detailText}>{description}</Text>
                    <Button style={styles.editButton} labelStyle={{fontSize: 12}} mode="contained"
                            onPress={() => setIsEditing(true)}>Edit user details</Button>
                    {/*<Button style={styles.editButton} labelStyle={{ fontSize: 12 }} mode="contained">Change password</Button>*/}
                    {/*<Button style={styles.editButton} labelStyle={{ fontSize: 12 }} mode="contained">Change avatar image</Button>*/}
                    <Logout/>
                </Animated.View>
            )}

            <Modal
                transparent={true}
                visible={isEditing}
                onRequestClose={() => setIsEditing(false)}
                animationType="slide"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit info about you</Text>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            maxLength={80}
                            onChangeText={setUsername}
                            style={styles.input}
                            label="Username"
                            mode="outlined"
                        />
                        <TextInput
                            placeholder="Position"
                            value={position}
                            maxLength={120}
                            onChangeText={setPosition}
                            style={[styles.input, styles.textArea]}
                            label="Position"
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            maxLength={256}
                            onChangeText={setDescription}
                            style={[styles.input, styles.textArea, {height: 180}]}
                            label="Description"
                            mode="outlined"
                            multiline
                            numberOfLines={8}
                        />
                        <Button style={styles.saveButton} onPress={change_user_info} mode='contained'>Save</Button>
                        <TouchableOpacity
                            onPress={() => {
                                setUsername(userDetails['username']);
                                setIsEditing(false);
                            }}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};
