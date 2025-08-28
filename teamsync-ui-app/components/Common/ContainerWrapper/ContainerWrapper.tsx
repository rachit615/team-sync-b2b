import { StyleSheet, View } from "react-native";

export default function ContainerWrapper({ children }: any) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderColor: "#F5F2F2",
    borderWidth: 1,
  },
});
