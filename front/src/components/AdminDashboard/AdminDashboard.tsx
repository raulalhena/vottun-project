import './AdminDashboard.css';

const AdminDashboard = () => {

    const deployNFTContract = async () => {

        const resp = await fetch('https://api.vottun.tech/erc/v1/erc721/deploy', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-application-vkn': import.meta.env.APP_ID,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "name": "SOCIAL SECURE",
                "symbol": "SOSE",
                "network": 80001,
                "gasLimit": 6000000,
                "alias": "Social Secure"
            })
        });

        const result = await resp.json();

        console.log('NFT contract ', result);
    };

    return (
        <div className='admin-div'>
            <button className='dashboard-button' onClick={deployNFTContract}>Deploy NFT Contract</button>
        </div>
    )
}

export default AdminDashboard;