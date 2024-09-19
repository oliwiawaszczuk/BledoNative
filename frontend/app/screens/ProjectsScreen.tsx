import React, {useCallback, useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    Platform, Modal,
} from 'react-native';
import {Button, Text, Card, Appbar, useTheme, TextInput} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {storage} from '../../api/store';
import {InviteCard} from "../components/InviteCard";
import {log} from "expo/build/devtools/logger";
import TextInputFlat from "react-native-paper/lib/typescript/components/TextInput/TextInputFlat";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Project = ({item, handleCardPress}) => {
    return (
        <TouchableOpacity onPress={() => handleCardPress(item.id)}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDescription}>{item.description}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default function ProjectsScreen({navigation}) {
    const [selectedTab, setSelectedTab] = useState('owner');
    const token = storage((state) => state.token);

    const {data: projects, refetch} = useQuery({
        queryFn: () => fetch(`http://192.168.1.191:5000/api/get_projects/${token}`)
            .then(response => response.json()),
        queryKey: ['projects'],
    });

    const projectsOwner = projects?.projects_owner || [];

    const projectsIn = projects?.projects_in || [];

    const projectsInvited = projects?.projects_invited || [];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');

    const handleAddProject = useCallback(() => {
        fetch(`http://192.168.1.191:5000/api/add_new_project/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newProjectName, newProjectDescription})
        });
        setNewProjectName('');
        setNewProjectDescription('');
        setIsModalVisible(false);
        refetch()
    }, [newProjectName, newProjectDescription]);

    const handleCardPress = (id) => {
        console.log(`Project ID pressed: ${id}`);
        // Add navigation or other action here
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Projects"/>
                <Appbar.Action icon="reload" onPress={() => refetch()}/>
            </Appbar.Header>

            <View style={styles.tabContainer}>
                <Button
                    mode={selectedTab === 'owner' ? 'contained' : 'outlined'}
                    style={styles.tabButton}
                    onPress={() => setSelectedTab('owner')}
                >
                    Yours
                </Button>
                <Button
                    mode={selectedTab === 'in' ? 'contained' : 'outlined'}
                    style={styles.tabButton}
                    onPress={() => setSelectedTab('in')}
                >
                    Team
                </Button>
                <Button
                    mode={selectedTab === 'invited' ? 'contained' : 'outlined'}
                    style={styles.tabButton}
                    onPress={() => setSelectedTab('invited')}
                >
                    Invited
                </Button>
            </View>

            <View style={styles.projectsContainer}>
                {selectedTab === 'owner' && projectsOwner.length > 0 &&
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => setIsModalVisible(true)}
                            style={styles.addButton}
                        >
                            New Project </Button>
                        <FlatList
                            data={projectsOwner}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <Project item={item} handleCardPress={handleCardPress}/>
                            )}
                        />
                        <Modal
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={() => setIsModalVisible(false)}
                            animationType="slide"
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalTitle}>Add New Project</Text>
                                    <TextInput
                                        placeholder="Project Name"
                                        value={newProjectName}
                                        onChangeText={setNewProjectName}
                                        style={styles.input}
                                    />
                                    <TextInput
                                        placeholder="Project Description"
                                        value={newProjectDescription}
                                        onChangeText={setNewProjectDescription}
                                        style={[styles.input, styles.multilineInput]}
                                        multiline
                                        numberOfLines={4}
                                    />
                                    <TouchableOpacity
                                        onPress={handleAddProject}
                                        style={[
                                            styles.submitButton,
                                            newProjectName.trim() === '' ? styles.submitButtonDisabled : styles.submitButtonActive,
                                        ]}
                                        disabled={newProjectName.trim() === ''}
                                    >
                                        <Text style={styles.submitButtonText}>Add Project</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsModalVisible(false)
                                            setNewProjectName('')
                                            setNewProjectDescription('')
                                        }}
                                        style={styles.cancelButton}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
                {selectedTab === 'in' && projectsIn.length > 0 &&
                    <FlatList
                        data={projectsIn}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <Project item={item} handleCardPress={handleCardPress}/>
                        )}
                    />
                }
                {selectedTab === 'invited' && projectsInvited.length > 0 &&
                    <FlatList
                        data={projectsInvited}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <InviteCard item={item} refetch={refetch}/>
                        )}
                    />
                }
                {selectedTab === 'owner' && projectsOwner.length === 0 && (
                    <Text style={styles.emptyText}>No projects found</Text>
                )}
                {selectedTab === 'in' && projectsIn.length === 0 && (
                    <Text style={styles.emptyText}>No projects found</Text>
                )}
                {selectedTab === 'invited' && projectsInvited.length === 0 && (
                    <Text style={styles.emptyText}>No projects found</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    addButton: {
        marginBottom: 16,
        backgroundColor: '#553e90',
    },
    submitButtonActive: {
        backgroundColor: '#4CAF50',
    },
    submitButtonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        width: '100%',
        backgroundColor: '#F44336',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 5,
    },
    projectsContainer: {
        flex: 1,
        padding: 16,
    },
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
    cardClicked: {
        backgroundColor: '#e0e0e0',
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
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
});

