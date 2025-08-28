import ContainerWrapper from "@/components/Common/ContainerWrapper/ContainerWrapper";
import { StyleSheet, Text, View } from "react-native";

export default function ActivityFeed() {
  return (
    <ContainerWrapper>
      <View>
        <Text style={styles.upToDate}>{`You're up to date`}</Text>
        <Text style={styles.checkInbox}>For recent activity, check Inbox</Text>
      </View>
    </ContainerWrapper>
  );
}

const styles = StyleSheet.create({
  upToDate: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 6,
  },
  checkInbox: {
    fontSize: 14,
    color: "#6B7280",
  },
});
