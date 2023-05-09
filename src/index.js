import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './components/hero.jsx';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { getDefaultWallets, connectorsForWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet, coinbaseWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
    [mainnet, goerli],
    [
        jsonRpcProvider({
            rpc: () => ({
                http: `https://eth-rpc.gateway.pokt.network`,
            }),
        }),
        publicProvider()
        ,
        jsonRpcProvider({
            rpc: () => ({
                http: `https://rpc.ankr.com/eth_goerli`,
            }),
        }),
        publicProvider()
        ]
);


const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            coinbaseWallet({ chains }),
            walletConnectWallet({ chains }),
            rainbowWallet({ chains }),
            ledgerWallet({ chains }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <div>
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                appInfo={{ appName: 'Lotus Carbon Retirements', learnMoreUrl: 'https://learnaboutcryptowallets.example', }}
                theme={lightTheme({
                    overlayBlur: 'small',
                    accentColor: '#66cc8a',
                    accentColorForeground: 'black',
                    borderRadius: 'small',
                    fontStack: 'system',
                })}
                chains={chains}
                modalSize="compact">
                <Example />
                <ToastContainer
                    position="bottom-right"
                    autoClose={false}
                    newestOnTop={true}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="light"
                />
            </RainbowKitProvider>
        </WagmiConfig>
    </div>);