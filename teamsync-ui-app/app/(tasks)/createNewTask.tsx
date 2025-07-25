import Button from "@/components/Common/Button/Button";
import DateCard from "@/components/Common/DateCard/DateCard";
import PriorityLabel from "@/components/Common/PriorityLabel/PriorityLabel";
import ScreenHeader from "@/components/Common/ScreenHeader/ScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateTaskFormData } from "../store/taskFormSlice";

export default function CreateNewTask() {
  const params = useLocalSearchParams();

  const dispatch = useDispatch();
  const taskData = useSelector((state: RootState) => state.taskForm);

  const [files, setFiles] = useState<{ name: string; uri: string }[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<string[]>([
    "Buhgalter",
    "Merdan K.",
    "Maysa G.",
  ]);
  const [showDatePicker, setShowDatePicker] = useState<{
    mode: "start" | "due" | null;
  }>({ mode: null });

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
        const updatedUsers = [...assignedUsers, ...uniqueNewUsers];
        setAssignedUsers(updatedUsers);
        handleChangeTask("taskAssignedUsers", updatedUsers);
      }
      router.setParams({ selectedUsers: undefined });
    }
  }, [params.selectedUsers]);

  const handleChangeTask = (key: keyof typeof taskData, value: any) => {
    dispatch(updateTaskFormData({ key, value }));
  };

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });

    if (!result.canceled && result.assets?.length > 0) {
      const newFiles = result.assets.map((file) => ({
        name: file.name,
        uri: file.uri,
      }));
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      handleChangeTask("taskFiles", updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    handleChangeTask("taskFiles", updatedFiles);
  };

  const handleAddUser = () => {
    router.navigate({
      pathname: "/(tasks)/teamMembers",
      params: { currentAssignedUsers: assignedUsers.join(",") },
    });
  };

  const handleRemoveUser = (name: string) => {
    const updatedUsers = assignedUsers.filter((user) => user !== name);
    setAssignedUsers(updatedUsers);
    handleChangeTask("taskAssignedUsers", updatedUsers);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader
        headerTitle="Create new task"
        leftIcon="close"
        leftIconPress={() => router.back()}
        headerStyle={styles.header}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <Text style={styles.title}>Task Type</Text>
        <View style={styles.priorityContainer}>
          {["Low", "Medium", "High", "Urgent"].map((priority) => {
            const colorMap = {
              Low: "#228B22",
              Medium: "#C77D00",
              High: "#D72638",
              Urgent: "#4B4B4B",
            };
            const bgMap = {
              Low: "#D5F2D7",
              Medium: "#FDE9CC",
              High: "#FFD1D6",
              Urgent: "#D3D3D3",
            };
            return (
              <TouchableOpacity
                key={priority}
                onPress={() => handleChangeTask("taskPriority", priority)}
              >
                <PriorityLabel
                  text={priority}
                  bgColor={
                    taskData.taskPriority === priority
                      ? bgMap[priority]
                      : "#f0f0f0"
                  }
                  textColor={
                    taskData.taskPriority === priority
                      ? colorMap[priority]
                      : "#999"
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.title}>Choose Date</Text>
        <View style={styles.dateSelect}>
          <DateCard
            label="Start Date"
            dateTime={taskData.taskStartDate || "--"}
            onPress={() => {
              setShowDatePicker({ mode: "start" });
            }}
          />

          <DateCard
            label="Due Date"
            dateTime={taskData.taskDueDate || "--"}
            onPress={() => {
              setShowDatePicker({ mode: "due" });
            }}
          />
        </View>

        {showDatePicker.mode && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker({ mode: null });
              if (selectedDate) {
                const formattedDate = `${selectedDate
                  .getDate()
                  .toString()
                  .padStart(2, "0")}.${(selectedDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}.${selectedDate.getFullYear()}`;
                handleChangeTask(
                  showDatePicker.mode === "start"
                    ? "taskStartDate"
                    : "taskDueDate",
                  formattedDate
                );
              }
            }}
          />
        )}

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
                    <Ionicons name="document-outline" size={14} color="#555" />
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
            <TouchableOpacity style={styles.addUserBtn} onPress={handleAddUser}>
              <Ionicons name="add" size={16} color="white" />
              <Text style={styles.addUserText}>Add</Text>
            </TouchableOpacity>

            {assignedUsers.map((user, index) => {
              const initials = user
                .split(" ")
                .map((part) => part[0])
                .join("".slice(0, 2))
                .toUpperCase();
              return (
                <View key={index} style={styles.userPill}>
                  <View style={styles.userInitials}>
                    <Text
                      style={{
                        color: "#292A2D",
                        fontSize: 10,
                        fontWeight: "600",
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
            value={taskData.taskName}
            onChangeText={(text) => handleChangeTask("taskName", text)}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#999"
            style={[styles.input, styles.descriptionInput]}
            value={taskData.taskDescription}
            onChangeText={(text) => handleChangeTask("taskDescription", text)}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.addTaskBtmBtnWrapper}>
        <Button
          BtnText="Add task"
          onButtonClick={() => {
            console.log("Final taskData :>> ", taskData);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 0,
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
