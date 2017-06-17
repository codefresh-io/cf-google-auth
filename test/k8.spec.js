describe('k8 tests', ()=>{

  const Api = require('kubernetes-client');
  const Client = require('node-kubernetes-client');
  let user, pwd, url;
  it.skip('connect', (done)=>{

    const core = new Api.Core({
    url: 'https://104.199.235.99',
    insecureSkipTlsVerify: true,
    auth: {
      user, pwd
    }
  })

    core.ns.pods.get("app", done);

  });

 let client;

 beforeEach(()=>{
   var Client = require('node-kubernetes-client');
   user = k8.auth.user;
   pwd = k8.auth.user;
   url = '35.184.247.176';
   let proxy = "localhost:8001"

   client = new Client({
      host:  url,
      protocol: 'https',
      version: 'v1',
      namespace : 'default',
      token: authToken;

  });

 })
 it('get pods->default namespace', (done)=>{


  const kefir = require('kefir');
  const prettyJson = require('prettyjson');
  let s  = kefir.fromNodeCallback(client.pods.get.bind(client.pods)).flatten().map((pod)=>{
    console.log('p');
    return prettyJson.render(pod)

  })
  s.log();
  s.onEnd(done);
  s.onError(done);
 })

 it('get namespaces', (done)=>{


  const kefir = require('kefir');
  const prettyJson = require('prettyjson');
  let s  = kefir.fromNodeCallback(client.namespaces.get.bind(client)).flatten().map((pod)=>{
    return prettyJson.render(pod)

  })
  s.log();
  s.onEnd(done);
  s.onError(done);
 })

 it.only('get services', (done)=>{


  const kefir = require('kefir');
  const prettyJson = require('prettyjson');
  let s  = kefir.fromNodeCallback(client.services.get.bind(client)).flatten().map((pod)=>{
    return prettyJson.render(pod)

  })
  s.log();
  s.onEnd(done);
  s.onError(done);
 })

})
