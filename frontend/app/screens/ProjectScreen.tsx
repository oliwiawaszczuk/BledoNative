import React, {createContext, useEffect, useState} from "react";
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

export const projectContent = createContext(null);

const ProjectScreen = ({route, navigation}) => {
    const { projectId } = route.params;
    const api_host = storage((state) => state.api_host);
    const [currentPage, setCurrentPage] = useState<"dashboard" | "users" | "tasks" | "calendar" | "reports" | "settings">("dashboard")
    const token = storage((state) => state.token);

    const {data, isLoading, refetch} = useQuery({
        queryFn: () => fetch(`${api_host}/get_project_details/${projectId}/${token}`).then(response => response.json()),
        queryKey: ['projectDetails', projectId, token],
    });

    if (isLoading)
        return <Loading/>

    const permissions = data["permissions"];

    return (
        <projectContent.Provider value={{projectId, permissions}}>
            <View style={styles.container2}>
                <View>
                    <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} permissions={permissions}/>
                </View>
                <View style={{'flex': 1}}>
                    {currentPage === "dashboard" && <Dashboard/>}
                    {currentPage === "users" && <Users navigation={navigation}/>}
                    {currentPage === "tasks" && <Tasks/>}
                    {currentPage === "calendar" && <Calendar/>}
                    {currentPage === "reports" && <Reports/>}
                    {currentPage === "settings" && <Settings/>}
                </View>
            </View>
        </projectContent.Provider>
    );
};

export default ProjectScreen;
