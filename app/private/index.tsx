import { ScrollView } from 'react-native';
import { TopBar } from '@/components/TopBar';
import TowersWidget from '@/components/TowersWidget';
import LogsWidget from '@/components/LogsWidget';

export default function Dashboard() {
	return (<>
		<TopBar />
		<ScrollView>
			<TowersWidget />
			<LogsWidget />
		</ScrollView>
	</>);
};
