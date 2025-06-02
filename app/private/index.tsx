import { Button, ButtonText } from '@/components/ui/button';
import { useSessionContext } from '@/state/SessionContext';
import { View } from 'react-native';

export default function Dashboard() {
  const signOut = useSessionContext((state: any) => state.signOut);
  
  return (
    <View>
      This is the dashboard screen
      <Button size="md" variant="solid" action="primary" onPress={signOut} style={{ marginTop: 15 }}>
          <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  )
}
