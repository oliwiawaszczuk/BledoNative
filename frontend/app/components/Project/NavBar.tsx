import {View, Text, TouchableOpacity, LayoutAnimation} from "react-native";
import {styles} from "../../../assets/styles";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";

export const NavBar = ({setCurrentPage, currentPage, permissions}) => {
    const [isVisibleText, setIsVisibleText] = useState(false);

    const toggleVisibility = () => {
        LayoutAnimation.configureNext({
            duration: 200,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
        });
        setIsVisibleText(!isVisibleText);
    };

    useEffect(() => {
        if (isVisibleText === true)
            toggleVisibility()
    }, [currentPage]);

    useEffect(() => {
        console.log(permissions)
    }, []);

    return (
        <View style={styles.navBarContainer}>
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleVisibility}>
                <MaterialIcons name={isVisibleText ? "chevron-left" : "chevron-right"}
                               style={styles.toggleButtonIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("dashboard")}>
                <MaterialIcons name="dashboard" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Dashboard</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("users")}>
                <MaterialIcons name="people-alt" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Users</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("tasks")}>
                <MaterialIcons name="check-circle" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Tasks</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("calendar")}>
                <MaterialIcons name="calendar-today" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Calendar</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("reports")}>
                <MaterialIcons name="assessment" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Reports</Text>}
            </TouchableOpacity>

            {permissions['can_edit_settings_project'] && <TouchableOpacity style={styles.navBarIconText}
                onPress={() => setCurrentPage("settings")}>
                <MaterialIcons name="settings" style={styles.navBarIcon}/>
                {isVisibleText && <Text style={styles.navBarText}>Settings</Text>}
            </TouchableOpacity>}
        </View>
    );
};
