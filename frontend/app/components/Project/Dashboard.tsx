import React, {useContext} from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {projectContent} from "../../../api/context";

export const Dashboard = () => {
    const {projectId, permissions} = useContext(projectContent);
    return (
        <View>
            <Text>Dashboard {projectId}</Text>
        </View>
    );
}