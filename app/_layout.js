import 'react-native-get-random-values'
import { Stack} from "expo-router";
import { RealmProvider } from "@realm/react";
import { Task } from './Task';

export default function AppLayout() {

  return (
    <RealmProvider schema={[Task]}>
      <Stack />
    </RealmProvider>
  );
}
