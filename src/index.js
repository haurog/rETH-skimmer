import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './components/hero.jsx';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { getDefaultWallets, connectorsForWallets, RainbowKitProvider, lightTheme, Wallet } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet, coinbaseWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig, Chain } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Chain } from 'wagmi'

import browserWalletIcon from './img/wallet-solid_orange.svg';

const { chains, publicClient } = configureChains(
  [mainnet, goerli],
  [
    publicProvider()
  ]
);

const appName = 'rETH Skimmer';
const projectId = '22345ea61ded95a41c373804c265feed'

const { connectors } = getDefaultWallets({
  appName: appName,
  projectId: projectId,
  chains
})

// The following block is just to customize the injected wallet name and icon
// const browserWallet = wallets[0].wallets.find(({ id }) => id === 'injected')
// browserWallet.iconUrl = browserWalletIcon
// browserWallet.name = 'Browser Wallet'

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       // browserWallet,
//       metaMaskWallet({ chains }),
//       walletConnectWallet({ chains }),
//       coinbaseWallet({ chains, appName }),
//       rainbowWallet({ chains }),
//       ledgerWallet({ chains }),
//     ],
//   },
// ]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <div>
    <WagmiConfig config={wagmiConfig}>
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