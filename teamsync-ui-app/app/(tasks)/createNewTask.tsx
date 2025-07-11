import Button from "@/components/Common/Button/Button";
import DateCard from "@/components/Common/DateCard/DateCard";
import PriorityLabel from "@/components/Common/PriorityLabel/PriorityLabel";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateNewTask() {
  const params = useLocalSearchParams();
  const [files, setFiles] = useState<{ name: string; uri: string }[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<string[]>([
    "Buhgalter",
    "Merdan K.",
    "Maysa G.",
  ]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  console.log("params.selectedUsers :>> ", params);

  useEffect(() => {
    const selectedUsersString = params.selectedUsers as string | undefined;

    if (selectedUsersString !== undefined) {
      const newSelectedUsers = selectedUsersString
        .split(",")
        .filter((name) => name.trim() !== "");

      const uniqueNewUsers = newSelectedUsers.filter(
        (user) => !assignedUsers.includes(user)
      );

      if (uniqueNewUsers.length > 0) {
        setAssignedUsers((prev) => [...prev, ...uniqueNewUsers]);
      }
      router.setParams({ selectedUsers: undefined });
    }
  }, [params.selectedUsers]);

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });

    if (!result.canceled && result.assets?.length > 0) {
      const newFiles = result.assets.map((file) => ({
        name: file.name,
        uri: file.uri,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleAddUser = () => {
    router.navigate({
      pathname: "/(tasks)/teamMembers",
      params: { currentAssignedUsers: assignedUsers.join(",") },
    });
  };

  const handleRemoveUser = (name: string) => {
    setAssignedUsers((prev) => prev.filter((user) => user !== name));
  };

  console.log("files :>> ", files);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          <Text style={styles.title}>Task Type</Text>
          <View style={styles.priorityContainer}>
            <PriorityLabel text="Low" bgColor="#D5F2D7" textColor="#228B22" />
            <PriorityLabel
              text="Medium"
              bgColor="#FDE9CC"
              textColor="#C77D00"
            />
            <PriorityLabel text="High" bgColor="#FFD1D6" textColor="#D72638" />
            <PriorityLabel
              text="Urgent"
              bgColor="#D3D3D3"
              textColor="#4B4B4B"
            />
          </View>
          <Text style={styles.title}>Choose Date</Text>
          <View style={styles.dateSelect}>
            <DateCard label="Start Date" dateTime="10.08.2023 / 10:00" />
            <DateCard label="Due Date" dateTime="18.08.2023 / 18:45" />
          </View>
          <View style={styles.uploadFile}>
            <Text style={styles.title}>Upload File</Text>
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
              >
                <Ionicons name="cloud-upload-outline" size={16} color="white" />
                <Text style={styles.uploadButtonText}>Upload</Text>
              </TouchableOpacity>

              <View style={styles.fileList}>
                {files.map((file, index) => (
                  <View key={index} style={styles.filePill}>
                    <View style={styles.fileIconBg}>
                      <Ionicons
                        name="document-outline"
                        size={14}
                        color="#555"
                      />
                    </View>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <TouchableOpacity onPress={() => removeFile(file.name)}>
                      <Ionicons name="close" size={14} color="#555" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.assignedUsers}>
            <Text style={styles.title}>Assigned users</Text>
            <View style={styles.userList}>
              <TouchableOpacity
                style={styles.addUserBtn}
                onPress={handleAddUser}
              >
                <Ionicons name="add" size={16} color="white" />
                <Text style={styles.addUserText}>Add</Text>
              </TouchableOpacity>

              {assignedUsers?.map((user, index) => {
                const initials = user
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <View key={index} style={styles.userPill}>
                    <View style={styles.userInitials}>
                      <Text
                        style={{
                          color: "#292A2D",
                          fontSize: 10,
                          fontWeight: 600,
                        }}
                      >
                        {initials}
                      </Text>
                    </View>
                    <Text style={styles.userName}>{user}</Text>
                    <TouchableOpacity onPress={() => handleRemoveUser(user)}>
                      <Ionicons name="close" size={14} color="#555" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Task name"
              placeholderTextColor="#999"
              style={styles.input}
              value={taskName}
              onChangeText={setTaskName}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#999"
              style={[styles.input, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.addTaskBtmBtnWrapper}>
        <Button BtnText="Add task" onButtonClick={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 600,
    color: "#292A2D",
  },
  dateSelect: {
    marginBottom: 25,
  },
  uploadFile: {
    marginBottom: 25,
  },
  uploadContainer: {
    marginTop: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4577EF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 6,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  fileList: {
    marginTop: 12,
    flexDirection: "column",
    gap: 8,
  },
  filePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
  },
  fileName: {
    fontSize: 14,
    color: "#444",
  },
  fileIconBg: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  assignedUsers: {},
  userList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    alignItems: "center",
  },
  addUserBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4577EF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addUserText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  userPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  userInitials: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 14,
    color: "#292A2D",
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
    marginTop: 45,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
    color: "#333",
    height: 56,
  },
  descriptionInput: {
    height: 158,
  },
  addTaskBtmBtnWrapper: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 11,
    paddingBottom: 11,
  },
});
