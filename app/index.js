import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useQuery, useRealm } from "@realm/react";
import { Task } from "./Task";
import { TaskList } from "./TaskList";



export default function Page() {
  const realm = useRealm();
  const [description, setDescription] = useState("");
  const tasks = useQuery(Task);

  const createNewTask = () => {
    realm.write(() => {
      const newTask = new Task(realm, description);
      setDescription(""); // Очистить поле ввода
      console.log('Created task:');
      console.log(newTask);
      return newTask;
    });
  };

  return (
    <View style={{ height: Dimensions.get("screen").height - 132 }}>
      <Text style={styles.title}>TASK LIST</Text>
      {/* input for description */}
      <TextInput
        placeholder="Please, enter new task"
        autoCapitalize="none"
        nativeID="description"
        multiline={true}
        numberOfLines={8}
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.textInput}
      />
      {/*  button to save the new task */}
      <TouchableOpacity
        style={styles.button}
        onPress={createNewTask}
      >
        <Text style={styles.buttonText}>SAVE TASK</Text>
      </TouchableOpacity>
      {/*<Text>{JSON.stringify(tasks, null, 2)}</Text>*/}
      <TaskList data={tasks}/>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    margin: 16,
    fontWeight: "700",
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "500",
    // color: "#455fff",
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    // borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 16,
    width: 120,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
});
