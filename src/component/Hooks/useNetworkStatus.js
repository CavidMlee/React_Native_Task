import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        handleConnectivityChange = async isConnected => {
            if (isConnected) {
                setIsConnected(true)
            }
            else {
                setIsConnected(false)
            }
        }

        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);
        return () => {
            NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
        };
    });

    return isConnected;
}