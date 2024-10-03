import {StyleSheet, TouchableOpacity, View, Modal} from "react-native";
import {Card, Text} from "react-native-paper";
import React, {useState, useRef, useCallback} from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from "../../assets/styles";
import {storage} from "../../api/store";

export const ProjectCard = ({item, handleCardPress, refetch}) => {
    const api_host = storage((state) => state.api_host);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({x: 0, y: 0}); // Pozycja modala
    const iconRef = useRef();

    const toggleModal = () => {
        iconRef.current?.measure((fx, fy, width, height, px, py) => {
            setModalPosition({x: px, y: py + height});
        });
        setIsModalVisible(!isModalVisible);
    };

    const MoveUp = useCallback(async () => {
        setIsModalVisible(!isModalVisible);
        const res = await fetch(`${api_host}/try_move_card/${item.id}/up`)
        if (res.ok) refetch()
    }, [isModalVisible, refetch, item]);

    const MoveDown = useCallback(async () => {
        setIsModalVisible(!isModalVisible);
        const res = await fetch(`${api_host}/try_move_card/${item.id}/down`)
        if (res.ok) refetch()
    }, [isModalVisible, refetch, item]);

    return (
        <View>
            <TouchableOpacity onPress={() => handleCardPress(item.id)}>
                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                        </View>
                        <TouchableOpacity onPress={toggleModal} ref={iconRef}>
                            <Icon name="more-vert" size={24} color="#666" />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                    <View
                        style={[
                            styles.modalContainer2,
                            {top: modalPosition.y, left: modalPosition.x - 150},
                        ]}
                    >
                        <TouchableOpacity style={styles.modalButton} onPress={MoveUp}>
                            <Text style={styles.modalButtonText}>Move card up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={MoveDown}>
                            <Text style={styles.modalButtonText}>Move card down</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
                            <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}
