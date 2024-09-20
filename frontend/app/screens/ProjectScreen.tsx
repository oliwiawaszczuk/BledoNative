import React from "react";
import {View, Text} from "react-native";

const ProjectScreen = ({route}) => {
    const { projectId } = route.params;

    return (
        <View>
            <Text>Project Details for ID: {projectId}</Text>
        </View>
    );
};

export default ProjectScreen;
