import { StyleSheet } from "react-native";

import { Colors } from "@/constants/ui";
import { shadowStyles } from "@/src/components/shadowStyles";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.bg,
        flexDirection: 'column',
    },
    header: {
        paddingTop: 25,
        backgroundColor: Colors.white,
        ...shadowStyles
    },
    headerTilte: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.black,
        alignSelf: 'center'
    },
    profileRow: {
        paddingVertical: 12,
    },
    profileCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        ...shadowStyles
    },
    mainSection: {
        flex: 1,
        padding: 14,
    },
   
}) 