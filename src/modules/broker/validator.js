export function BrokerConfig(name) {
  const data = {
    kite: {
      brokerName: 'Zerodha',
      imageSrc: 'res://zerodha',
      source: 'https://kite.zerodha.com/connect/login?v=3&api_key=',
      callbackUrl: '/brokers/kite/login/callback',
      credentialUrl: 'brokers/kite/credentials',
      setTokenUrl: 'brokers/kite/setToken',
      logoutUrl: '/brokers/kite/logout',
    },
    angel: {
      brokerName: 'Angel Broking',
      imageSrc: 'res://angel',
      source: 'https://smartapi.angelbroking.com/publisher-login?api_key=',
      credentialUrl: 'brokers/angel/credentials',
      setTokenUrl: 'brokers/angel/setToken',
      callbackUrl: '/brokers/angel/login/callback',
      logoutUrl: '/brokers/angel/logout',
    },
  };
  return data[name];
}
