import {Animated, TouchableOpacity, View} from "react-native";
import {ActivityIndicator, Caption, Divider, Text, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {styles} from "../../assets/styles";
import ScrollView = Animated.ScrollView;
import { useNavigation } from '@react-navigation/native';
import {MaterialIcons} from "@expo/vector-icons";
import {storage} from "../../api/store";
import {Loading} from "../components/Loading";

export default function UserScreen({route}) {
    const {email} = route.params;
    const api_host = storage((state) => state.api_host);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_host}/get_user_details_by_email/${email}`);
                const data = await response.json();
                setUserDetails(data['user']);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (isLoading)
        return <Loading/>

    return (
        <ScrollView style={styles.userDetailsContainer}>
            <View>
                <Title style={styles.title}>User Details</Title>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.detailRow}>
                <Caption style={styles.label}>Username:</Caption>
                <Text style={styles.value}>{userDetails["username"]}</Text>
            </View>
            <View style={styles.detailRow}>
                <Caption style={styles.label}>Email:</Caption>
                <Text style={styles.value}>{userDetails["email"]}</Text>
            </View>
            <View style={styles.detailRow}>
                <Caption style={styles.label}>Description:</Caption>
                <Text style={styles.value}>{userDetails["description"]}</Text>
            </View>
            <View style={styles.detailRow}>
                <Caption style={styles.label}>Position:</Caption>
                <Text style={styles.value}>{userDetails["position"]}</Text>
            </View>
            <View style={styles.detailRow}>
                <Caption style={styles.label}>Date of Account Creation:</Caption>
                <Text style={styles.value}>{userDetails["date_of_creation"]}</Text>
            </View>
        </ScrollView>
    );
}