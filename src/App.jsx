import React from "react"
import { DAppProvider, useAccountPkh, useConnect, useOnBlock, useTezos } from "./dapp/dapp"

const APP_NAME = 'Raffle';
const NETWORK = 'ghostnet';

function Page(props) {
    return <div className="App"> {props.children}</div>
}

function ConnectionButton() {
    const connect = useConnect()
    const handleConnect = React.useCallback(async () => {
        try {
            await connect(NETWORK, { forcePermission: true })
        } catch (err) {
            console.error(err.message)
        }
    }, [connect])
    return <button onClick={handleConnect}>Connect account</button>
}

function ConnectionSection() {
    const connect = useConnect()
    const accountPkh = useAccountPkh()
    const tezos = useTezos()
    const [balance, setBalance] = React.useState(null)
    const handleConnect = React.useCallback(async () => {
        try {
            await connect(NETWORK, { forcePermission: true })
        } catch (err) {
            console.error(err.message)
        }
    }, [connect])


    const accountPkhPreview = React.useMemo(() => {
        if (!accountPkh) return undefined
        else {
            const ln = accountPkh.length
            return `${accountPkh.slice(0, 7)}...${accountPkh.slice(ln - 4, ln)}`
        }
    }, [accountPkh])

    const loadBalance = React.useCallback(async () => {
        if (tezos) {
            const bal = await tezos.tz.getBalance(accountPkh)
            setBalance(tezos.format('mutez', 'tz', bal).toString())
        }
    }, [tezos, accountPkh, setBalance])

    React.useEffect(() => {
        loadBalance()
    }, [loadBalance])

    useOnBlock(tezos, loadBalance)

    return <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr', margin: '0 auto', width: "500px" }}>
        <div>{balance}</div>
        <div>{accountPkhPreview}</div>
        <button onClick={handleConnect}>Connect account</button>
    </div>
}

function App() {
    return (
        <DAppProvider appName={APP_NAME}>
            <React.Suspense fallback={null}>
                <Page>
                    {/* <ConnectionButton></ConnectionButton> */}
                    <ConnectionSection></ConnectionSection>
                </Page>
            </React.Suspense>
        </DAppProvider>
    )
}

export default App;