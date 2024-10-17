import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import {month} from "react-native-calendars/src/dateutils";
import {MaterialIcons} from "@expo/vector-icons";

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: {selected: true, marked: true, selectedColor: '#553e90'}
                        // dodanie wszystkich eventów
                    }}
                    firstDay={1}
                    //onDayLongPress={(day) => console.log('Day long pressed: ', day)}
                    enableSwipeMonths={true}
                    renderArrow={(direction) => (
                        <MaterialIcons name={direction === 'left' ? 'arrow-left' : 'arrow-right'} size={25} color="#553e90"/>
                    )}
                />
            </Card>
            <Card>
                <Text>{selectedDate.toString()}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 11,
    },
    card: {
        borderRadius: 10,
        elevation: 4,
    },
});
