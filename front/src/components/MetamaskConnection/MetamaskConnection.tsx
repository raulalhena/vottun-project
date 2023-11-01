import './MetamaskConnection.css';

const MetamaskConnection = () => {
  return (
    <div className='main'>
        <img src='/src/assets/socialsecure.png' className='logo'/>
        <button className='login-button' onClick={console.log('hola')}>Login with wallet</button>
    </div>
  )
}

export default MetamaskConnection