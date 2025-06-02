import { TopBar } from '@/components/TopBar';
import { logs } from '@/dummyData/logs.json';
import { useState } from 'react';
import ContractedTowers from '@/components/ContractedTowers';
import FreeTowers from '@/components/FreeTowers';
import { ScrollView, Text, View } from 'react-native';
import Switch from '@/components/Switch';

export default function Dashboard() {
	const [towerState, setTowerState] = useState<'Contracted' | 'Free'>('Contracted');
	const toggleTowerState = () => {
		if (towerState === 'Contracted') {
			setTowerState('Free');
			return;
		};
		if (towerState === 'Free') {
			setTowerState('Contracted');
			return;
		};
	};

	return (<>
		<TopBar />
		<ScrollView>

			<View style={{  margin: 15, backgroundColor: '#121212', borderRadius: 10 }}>
				<View style={{ flexDirection:'row', alignItems: 'center', margin: 15 }}>
					<Switch onToggle={toggleTowerState} value={towerState === 'Contracted'} />
					<Text style={{ marginLeft: 25, color: 'white', fontSize: 24 }}>{towerState} Towers</Text>
				</View>

				{ towerState === 'Contracted' 
					? <ContractedTowers /> 
					: <FreeTowers /> 
				}
			</View>

			{/* access log stream */}
		</ScrollView>
	</>);
};
