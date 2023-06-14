import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './components/hero.jsx';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, connectorsForWallets, RainbowKitProvider, lightTheme, Wallet } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet, coinbaseWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Chain } from 'wagmi'

import browserWalletIcon from './img/wallet-solid_orange.svg';

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [
    publicProvider()
  ]
);

const appName = 'rETH Skimmer';

// The following block is just to customize the injected wallet name and icon
const { wallets } = getDefaultWallets({
  appName: appName,
  chains
})
const browserWallet = wallets[0].wallets.find(({ id }) => id === 'injected')
browserWallet.iconUrl = browserWalletIcon
browserWallet.name = 'Browser Wallet'

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      browserWallet,
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName }),
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
        appInfo={{ appName: 'rETH Skimmer', learnMoreUrl: 'https://learnaboutcryptowallets.example', }}
        theme={lightTheme({
          overlayBlur: 'small',
          accentColor: '#64748b',
          accentColorForeground: 'white',
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