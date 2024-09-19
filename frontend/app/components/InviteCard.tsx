import React, {useState} from "react";
import {Animated, LayoutAnimation, StyleSheet, TouchableOpacity, View} from "react-native";
import {Card, IconButton, Text} from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

function AcceptInvitation(id: number) {
    fetch(`http://192.168.1.191:5000/api/accept_invitation_to_project/${id}`)
}

function RejectInvitation(id: number) {
    fetch(`http://192.168.1.191:5000/api/reject_invitation_to_project/${id}`)
}

export function InviteCard({ item, refetch }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisible(!isVisible)
    };

    return (
        <TouchableOpacity onPress={toggleVisibility}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.headerContainer}>
                        <Text style={styles.cardTitle}>Invite to: {item.name}</Text>
                        <Text style={styles.cardInvitedBy}>Invited by: {item.invited_by}</Text>
                    </View>

                    {isVisible && (
                        <Animated.View style={styles.descriptionContainer}>
                            <Text style={styles.cardDescription}>Invite description: {item.invite_description}</Text>
                            <Text style={styles.cardDescription}>Project description: {item.project_description}</Text>
                        </Animated.View>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => {
                                AcceptInvitation(item.id);
                                refetch();
                            }}>
                            <MaterialIcons name="check-circle-outline" size={26} color="#4CAF50" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={() => {
                                RejectInvitation(item.id);
                                refetch();
                            }}>
                            <MaterialIcons name="cancel" size={26} color="#F44336" />
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        backgroundColor: '#ffffff',
        elevation: 3,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    headerContainer: {
        marginBottom: 10,
    },
    descriptionContainer: {
        marginTop: 15,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    cardInvitedBy: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
    cardDescription: {
        fontSize: 16,
        color: '#555',
        marginVertical: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    acceptButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0ffe0',
        borderRadius: 25,
        paddingVertical: 5,
        justifyContent: 'center',
        width: '45%',
    },
    rejectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffe0e0',
        borderRadius: 25,
        paddingVertical: 5,
        justifyContent: 'center',
        width: '45%',
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});