import {View} from "react-native";
import {Text} from "react-native-paper";

export default function UserScreen({route}) {
  const { email } = route.params;
    return (
        <View>
            <Text>{email}</Text>
        </View>
    );
}