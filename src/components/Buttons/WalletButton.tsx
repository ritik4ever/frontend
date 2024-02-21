'Use Client';
import { useSorobanReact } from '@soroban-react/core';
import { isConnected } from "@stellar/freighter-api";
import { ButtonLight, ButtonPrimary } from 'components/Buttons/Button';
import { ConnectorsDropdown } from 'components/Buttons/ConnectorsDropdown';
import { AppContext } from 'contexts';
import React, { useContext, useEffect, useState } from 'react';
import { xbull } from '@soroban-react/xbull';
import { freighter } from '@soroban-react/freighter';

import * as Bowser from 'bowser';

export function WalletButton({ style, light }: { style?: React.CSSProperties; light?: boolean}) {
    const sorobanContext = useSorobanReact();
    const { address } = sorobanContext;
    const { ConnectWalletModal } = useContext(AppContext);
    const { isConnectWalletModalOpen, setConnectWalletModalOpen } = ConnectWalletModal;
    const [ hasFreighter, setHasFreighter ]  = useState(false)
    const [ hasXBull, setHasXBull ]  = useState(false)
    const handleClick = () => {
        setConnectWalletModalOpen(true);
    };
    const installFreighter = () => {
        connected();
        if (hasFreighter) {
            window.location.reload();
        }
        else {
            const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName()
            switch (browser) {
                case 'Firefox':
                    window.open('https://addons.mozilla.org/en-US/firefox/addon/freighter/', '_blank');
                    break;
                default: 
                    window.open('https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk', '_blank');
                    break;
            }
            setTimeout(() => {
                window.location.reload();
            }
            , 12000)
        }
    }
    const connected = async () => {
        const connected = await isConnected()
        setHasFreighter(connected)
        return connected
      }
    const ButtonComponent = light ? ButtonLight : ButtonPrimary;
    //console.log(sorobanContext.activeConnector)
    
    useEffect(() => {
        if((window as any).xBullSDK){
            console.log('xBullSDK is available');
          } else {
            console.log('xBullSDK is not available');
          }
        connected();
    }, [])
    
    return (
        <>  

            { hasFreighter ? (
                    <>
                   {/*      <ButtonComponent style={style} onClick={handleClick}>
                            Connect Wallet
                        </ButtonComponent> */}
                        <ConnectorsDropdown/>
                    </>
                ) : (
                    <>
           {/*              <ButtonComponent style={style} onClick={installFreighter}>
                            Install Freighter
                        </ButtonComponent> */}
                        <ConnectorsDropdown/>
                    </>
                )   
            }
            
        </>
    );
}
