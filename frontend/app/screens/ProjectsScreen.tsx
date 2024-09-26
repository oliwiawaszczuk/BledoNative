import React, {useCallback, useState} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import {Button, Text, Card, Appbar, useTheme, TextInput} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {storage} from '../../api/store';
import {InviteCard} from "../components/InviteCard";
import {ProjectCard} from "../components/ProjectCard";
import {styles} from "../../assets/styles";

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

    const handleAddProject = useCallback(async () => {
        const res = await fetch(`http://192.168.1.191:5000/api/add_new_project/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newProjectName, newProjectDescription})
        });
        if (res.ok) {
            setNewProjectName('');
            setNewProjectDescription('');
            setIsModalVisible(false);
            refetch()
        }
    }, [newProjectName, newProjectDescription]);

    const handleCardPress = (id) => {
        navigation.navigate('Project', {projectId: id})
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
                {selectedTab === 'owner' &&
                    <View>
                        <Button
                            mode="contained"
                            onPress={() => setIsModalVisible(true)}
                            style={styles.addButton}
                        >
                            New Project
                        </Button>
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
                                        maxLength={80}
                                        onChangeText={setNewProjectName}
                                        style={styles.input}
                                    />
                                    <TextInput
                                        placeholder="Project Description"
                                        value={newProjectDescription}
                                        maxLength={256}
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
                {selectedTab === 'owner' && projectsOwner.length > 0 &&
                    <View>
                        <FlatList
                            data={projectsOwner}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <ProjectCard item={item} handleCardPress={handleCardPress} refetch={refetch}/>
                            )}
                        />
                    </View>
                }
                {selectedTab === 'in' && projectsIn.length > 0 &&
                    <FlatList
                        data={projectsIn}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ProjectCard item={item} handleCardPress={handleCardPress} refetch={refetch}/>
                        )}
                    />
                }
                {selectedTab === 'invited' && projectsInvited.length > 0 &&
                    <FlatList
                        data={projectsInvited}
                        keyExtractor={(item) => item.id.toString()}
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
