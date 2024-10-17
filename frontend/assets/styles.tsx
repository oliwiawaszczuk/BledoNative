import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container3: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
    },
    usersContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    userCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        width: "100%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userText: {
        fontSize: 16,
        color: "#333",
        flex: 1,
        flexWrap: "wrap",
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        padding: 4,
        borderRadius: 4,
    },
    addButtonUsersInProject: {
        backgroundColor: "#2ecc71",
        padding: 4,
        borderRadius: 4,
    },
    userDetails: {
        marginTop: 8,
        backgroundColor: "#f0f4f6",
        padding: 8,
        borderRadius: 8,
    },
    detailText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },
    boldText: {
        fontWeight: "bold",
    },
    viewProfileButton: {
        marginTop: 8,
        backgroundColor: "#3498db",
        borderRadius: 4,
        flexShrink: 1,
        flex: 1,
    },
    viewProfileButtonText: {
        fontSize: 14,
        textAlign: "center",
        flexWrap: "wrap",
    },
    invitedUserCard: {
        borderColor: "#95a5a6",
        borderWidth: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
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
        borderColor: 'rgba(221,221,221,0)',
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
        width: '80%',
        backgroundColor: 'rgba(226,85,75,0.94)',
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#ffffff',
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
    navBarContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        elevation: 5,
        paddingTop: 7,
        paddingHorizontal: 10,
        margin: 12,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    navBarIconText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#ded4f0',
        width: '100%',
    },
    navBarIcon: {
        fontSize: 24,
        color: '#4b3a77',
    },
    navBarText: {
        paddingLeft: 12,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4b3a77',
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginBottom: 15,
        backgroundColor: '#4b3a77',
        borderRadius: 50,
        alignSelf: 'center',
    },
    toggleButtonIcon: {
        fontSize: 28,
        color: '#ffffff',
    },
    rowContainer: {
        padding: 15,
        backgroundColor: '#f0f4f8',
        borderRadius: 12,
        margin: 15,
        elevation: 3,
    },
    imageContainer: {
        marginRight: 15,
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#4b3a77',
    },
    textContainer2: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2d3436',
        fontFamily: 'Roboto',
    },
    timeText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#596a70',
        marginRight: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#636e72',
    },
    dateCont: {
        // width: "70%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        fontSize: 16,
        color: '#636e72',
        marginTop: 5,
    },
    detailsContainer: {
        marginTop: 10,
        padding: 15,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#7257b6',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center',
    },
    saveButton: {
        marginBottom: 8,
        width: '100%',
        backgroundColor: '#28a745',
        elevation: 2,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4b3a77',
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: '#6c5ce7',
        borderRadius: 8,
        padding: 8,
        marginRight: 5,
    },
    addButton2: {
        backgroundColor: '#71cfc0',
        borderRadius: 8,
        padding: 6,
        alignItems: 'center',
        marginLeft: 16,
    },
    detailText2: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 12,
        marginVertical: 3,
        backgroundColor: '#c9c8db',
        borderRadius: 14,
        borderColor: '#666680',
        borderWidth: 2,
    },
    userDetailsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f6fa",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#34495e",
        textAlign: "center",
        marginBottom: 20,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: "#b2bec3",
        height: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dfe6e9",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#636e72",
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: "#2d3436",
        textAlign: "right",
        flex: 2,
        flexWrap: 'wrap',
    },
    settingsButton: {
        backgroundColor: 'gray',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 8,
    },
});
