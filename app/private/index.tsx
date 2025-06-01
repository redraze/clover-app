import { useSessionContext } from '@/state/SessionContext';
import { StyleSheet, View } from 'react-native';

export default function Dashboard() {
  const signIn = useSessionContext((state: any) => state.signIn);
  
  return (
    <View>
      This is the dashboard screen
    </View>
  )
}

const styles = StyleSheet.create({
  
});
