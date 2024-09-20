import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
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
        paddingBottom: 60,
    },
    cardClicked: {
        backgroundColor: '#e0e0e0',
    },
    cardInvitedBy: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
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
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 16,
        color: '#555',
        marginVertical: 8,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer2: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: 200,
    },
    modalButton: {
        padding: 12,
    },
    modalButtonText: {
        fontSize: 16,
    },
    closeModalButton: {
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginTop: 10,
    },
    closeModalButtonText: {
        fontSize: 16,
        color: '#444',
    },
});
