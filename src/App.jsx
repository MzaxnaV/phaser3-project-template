import React from "react"
import { DAppProvider, useConnect } from "./dapp/dapp"

const APP_NAME = 'Raffle';
const NETWORK = 'hangzounet';

function Page(props) {
    return <div className="App"> { props.children }</div>
}

function ConnectionButton() {
    const connect = useConnect()
    const handleConnect = React.useCallback( async () => {
        try {
            await connect(NETWORK, { forcePermission: true })
        } catch (err) {
            console.error(err.message)
        }
    }, [connect])
    return <button onClick={handleConnect}>Connect account</button>
}

function App() {
    return (
        <DAppProvider appName={ APP_NAME }>
            <React.Suspense fallback={null}>
                <Page> 
                    <ConnectionButton></ConnectionButton>
                </Page>
            </React.Suspense>
        </DAppProvider>
    )
}

export default App;