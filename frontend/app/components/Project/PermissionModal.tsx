import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput, Modal, StyleSheet, ScrollView } from 'react-native';
import {storage} from "../../../api/store";

export const PermissionModal = ({ email, projectId, positionUser, permissionEditingUser, visible, onClose }) => {
    const api_host = storage((state) => state.api_host);

    const [permissions, setPermissions] = useState([]);

    const [position, setPosition] = useState('');

    useEffect(() => {
        if (permissionEditingUser && positionUser) {
            setPermissions(permissionEditingUser);
            setPosition(positionUser);
        }
    }, [permissionEditingUser, positionUser]);

    const togglePermission = (permissionKey) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [permissionKey]: !prevPermissions[permissionKey]
        }));
    };

    const onSavePosition = () => {

    }

    const onSavePermissions = useCallback( async () => {
        try {
            const response = await fetch(`${api_host}/change_user_permissions_in_project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, projectId, permissions})
            });

            const data = await response.json()

            if(response.ok) {
            }
        } catch (error) {
        }
    }, [email, projectId])

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Position:</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Enter position"
                        value={position}
                        onChangeText={setPosition}
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => onSavePosition()}
                    >
                        <Text style={styles.saveButtonText}>Save Position</Text>
                    </TouchableOpacity>

                    <ScrollView style={styles.permissionsList}>
                        {Object.keys(permissions).map((permission) => (
                            <TouchableOpacity
                                key={permission}
                                style={styles.permissionRow}
                                onPress={() => togglePermission(permission)}
                            >
                                <Text style={styles.permissionName}>{permission}</Text>
                                <Switch
                                    value={permissions[permission]}
                                    onValueChange={() => togglePermission(permission)}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => onSavePermissions()}
                    >
                        <Text style={styles.saveButtonText}>Save Permissions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textArea: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    permissionsList: {
        maxHeight: 200,
    },
    permissionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    permissionName: {
        fontSize: 16,
        color: 'black',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
