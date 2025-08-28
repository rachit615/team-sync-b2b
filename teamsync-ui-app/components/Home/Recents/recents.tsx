import ContainerWrapper from "@/components/Common/ContainerWrapper/ContainerWrapper";
import { StyleSheet, Text, View } from "react-native";

export default function Recents() {
  return (
    <ContainerWrapper>
      <View style={styles.container}>
        <Text style={styles.recentText}>Recents</Text>
      </View>
    </ContainerWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recentText: { fontSize: 16, fontWeight: "500", marginBottom: 10 },
});
