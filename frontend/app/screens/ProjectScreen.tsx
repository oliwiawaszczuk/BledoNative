import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {NavBar} from "../components/Project/NavBar";
import {styles} from "../../assets/styles";
import {Dashboard} from "../components/Project/Dashboard";
import {Users} from "../components/Project/Users";
import {Settings} from "../components/Project/Settings";
import {Calendar} from "../components/Project/Calendar";
import {Tasks} from "../components/Project/Tasks";
import {Reports} from "../components/Project/Reports";
import {storage} from "../../api/store";
import {Loading} from "../components/Loading";


const ProjectScreen = ({route, navigation}) => {
    const { projectId } = route.params;
    const api_host = storage((state) => state.api_host);
    const [currentPage, setCurrentPage] = useState<"dashboard" | "users" | "tasks" | "calendar" | "reports" | "settings">("dashboard")
    const token = storage((state) => state.token);
    const [isLoading, setIsLoading] = useState(true);
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_host}/get_project_details/${projectId}/${token}`);
                const data = await response.json();
                setPermissions(data['permissions']);
                setCurrentPage('dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId, token]);

    if (isLoading || !permissions)
        <Loading/>

    return (
        <View style={styles.container2}>
            <View>
                {permissions && <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} permissions={permissions}/>}
            </View>
            <View style={{'flex': 1}}>
                {currentPage === "dashboard" && <Dashboard/>}
                {currentPage === "users" && <Users navigation={navigation} projectId={projectId} permissions={permissions}/>}
                {currentPage === "tasks" && <Tasks/>}
                {currentPage === "calendar" && <Calendar/>}
                {currentPage === "reports" && <Reports/>}
                {currentPage === "settings" && <Settings/>}
            </View>
        </View>
    );
};

export default ProjectScreen;
