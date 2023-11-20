import './AdminDashboard.css';

const AdminDashboard = () => {

    const API_KEY = '2XXFo9C1MnoqiOxK4Yem4ZEKuRy';

    const deployNFTContract = async () => {

        const resp = await fetch('https://api.vottun.tech/erc/v1/erc721/deploy', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-application-vkn': API_KEY
            },
            body: JSON.stringify({
                "name": "Vottun 721 contract",
                "symbol": "VTN721",
                "network": 80001,
                "gasLimit": 6000000,
                "alias": "My first 721 contract"
            })
        });
    };

    return (
        <div className='admin-div'>
            <button className='dashboard-button' onClick={deployNFTContract}>Deploy NFT Contract</button>
        </div>
    )
}

export default AdminDashboard;