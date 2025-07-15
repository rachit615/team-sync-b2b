import { Image, StyleSheet, Text, View } from "react-native";

export default function AvatarGroup({ members }: any) {
  return (
    <View style={styles.avatarGroup}>
      {members.slice(0, 2).map((member: any, index: number) => (
        <Image
          key={index}
          source={{ uri: member.avatar }}
          style={[styles.memberAvatar, { marginLeft: index === 0 ? 0 : -5 }]}
        />
      ))}
      {members.length > 2 && (
        <View style={styles.moreAvatar}>
          <Text style={styles.moreText}>+{members.length - 2}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  moreAvatar: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  moreText: {
    fontSize: 10,
    color: "#374151",
  },
});
