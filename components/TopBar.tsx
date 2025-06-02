import { useState } from 'react';
import { useSessionContext } from '@/state/SessionContext';
import { TokenType } from '@/types/types';
import { Button, ButtonText } from '@/components/ui/button';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Icon, SettingsIcon } from "@/components/ui/icon"
import { Popover, PopoverBackdrop, PopoverBody, PopoverContent } from "@/components/ui/popover";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const web = Platform.OS === 'web';

export function TopBar() {
    const insets = useSafeAreaInsets();
    const signOut = useSessionContext((state: any) => state.signOut);

    const token: TokenType = useSessionContext((state: any) => state.token);
    const { name } = token;

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const navigateHome = () => {
        // TODO
    }

    return (
        <View style={{ paddingTop: insets.top }}>
            <View style={[ styles.container, !web && { borderTopWidth: 4 } ]}>
                <Button onPress={navigateHome} style={{ ...styles.homeButton, backgroundColor: 'transparent' }}>
                    <Image 
                        style={{ height: 40, width: 40 }}
                        source={require('@/assets/tower.png')}
                        />
                </Button>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: web ? 24 : 18, fontWeight: 600, margin: 'auto' }}>{name}</Text>
                </View>

                {/* logout popover */}
                {/* https://gluestack.io/ui/docs/components/popover#popoverheader */}
                <Popover
                    isOpen={isOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    placement="bottom" size="md" 
                    trigger={(triggerProps) => (
                        <Button {...triggerProps} style={{ backgroundColor: 'transparent' }}>
                            <Icon as={SettingsIcon} className="w-10 h-10" />
                        </Button>
                    )}
                >
                <PopoverBackdrop style={{ backgroundColor: 'black' }} />
                    <PopoverContent style={styles.popoverContent}>
                        <PopoverBody>
                            <Button size="xl" variant="outline" action="primary" onPress={signOut}>
                                <ButtonText>Logout</ButtonText>
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 5, 
        paddingHorizontal: 10,
    },

    homeButton: {
        padding: 15, 
        margin: 0,
    },

    popoverContent: {
        marginTop: 5, 
        padding: 0, 
        borderRadius: 10, 
        borderColor: 'black', 
        borderWidth: 3,
    },
});
