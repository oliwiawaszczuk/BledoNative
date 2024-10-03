import {Text, View} from "react-native";
import React, {useEffect} from "react";
import {ActivityIndicator} from "react-native-paper";
import {styles} from "../../assets/styles";

export const Loading = () => {
    useEffect(() => {
        console.log("loading...")
    }, []);
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
            {/*<ActivityIndicator size="small" color="#000000" />*/}
        </View>
    );
}