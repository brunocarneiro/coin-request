import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RequestFaucetView from '../../pages/RequestFaucetView';
import apiFetcher from '../../services/ApiFetcher';
import civicService from '../../services/CivicService';

beforeAll(function() {
  Enzyme.configure({ adapter: new Adapter() });
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  mockCiviAuthentication();
});

test('Address is required must display when submits and no address is filled', () => {
  const page = mount(<RequestFaucetView />);
  
  login(page);

  const button = page.find("button");
  expect(button.length).toBe(1);
  button.simulate('click');

  const errorMessage = page.find('h3.error-message');
  expect(errorMessage.length).toBe(1);
  expect(errorMessage.text()).toBe("Address is required!");
});

test('request coin api and it answered successfuly', (done) => {
  mockApiFetcherWithSuccess();
  const page = mount(<RequestFaucetView />);

  login(page);
  
  let walletAddressVal = "1234";
  const input = page.find('input');
  expect(input.length).toBe(1);

  input.simulate('change', { target: {value: walletAddressVal} });
  
  const button = page.find('button');
  expect(button.length).toBe(1);
  button.simulate('click');

  setTimeout(()=>{ //in order to wait rerender after http call

    page.update();
    const successMessage = page.find('h2.success-message');
    expect(successMessage.length).toBe(1);
    expect(successMessage.text()).toBe("Thanks user@email.com! Enjoy the TETH's we've sent you!");
    done();
  }, 200);
});

test('display error message when request api does not succeed well', (done) => {
  mockApiFetcherWithError();
  const page = mount(<RequestFaucetView />);

  login(page);

  let walletAddressVal = "1234";
  const input = page.find('input');
  expect(input.length).toBe(1);

  input.simulate('change', { target: {value: walletAddressVal} });
  
  const button = page.find('button');
  expect(button.length).toBe(1);
  button.simulate('click');

  setTimeout(()=>{ //in order to wait rerender after http call

    page.update();
    const errorMessage = page.find('h3.error-message');
    expect(errorMessage.length).toBe(1);
    expect(errorMessage.text()).toBe("Network problem");
    done();
  }, 200);
});

test('bad request', (done) => {
  mockApiFetcherWithResponseError();

  const page = mount(<RequestFaucetView />);
  
  login(page);

  let walletAddressVal = "1234";
  const input = page.find('input');
  expect(input.length).toBe(1);

  input.simulate('change', { target: {value: walletAddressVal} });
  
  const button = page.find('button');
  expect(button.length).toBe(1);
  button.simulate('click');

  setTimeout(()=>{ //in order to wait rerender after http call

    page.update();
    const errorMessage = page.find('h3.error-message');
    expect(errorMessage.length).toBe(1);
    expect(errorMessage.text()).toBe("invalid address");
    done();
  }, 200);
});

function login(page){
  const button = page.find("button");
  expect(button.length).toBe(1);
  button.simulate('click');
}

function mockCiviAuthentication(){
  clearInterval(civicService.civicInitIntervalId);
  civicService.init = function(){}
  civicService.signup = function(callback){
    callback('auth-code-received', {response: "BwerwLASDdasPUWEGWEG"});
  }
}

function mockApiFetcherWithSuccess(){

  apiFetcher.request = function(walletAddress){
    return new Promise((resolve, reject)=>{
      resolve({
        json: function(){
          return new Promise((resolve, reject)=>{
            resolve({
              success: {
                txid: "0xa4b96d8f59a09dd475e011c3e8df5c7fc108bed891723532462ca79833b2c2bb",
                user: {value: "user@email.com"}
              }
            });
          });
        }
      });
    });
  }
  return apiFetcher;
}

function mockApiFetcherWithResponseError(){

  apiFetcher.request = function(walletAddress){
    return new Promise((resolve, reject)=>{
      resolve({
        json: function(){
          return new Promise((resolve, reject)=>{
            resolve({
              "status":400,
              "result":{
                "error":"invalid address",
                "name":"Invalid",
                "requestId":"cjkwy53du6g7spdrt68qhgofh"
              }
            });
          });
        }
      });
    });
  }

  return apiFetcher;
}

function mockApiFetcherWithError(){

  apiFetcher.request = function(walletAddress){
    return new Promise((resolve, reject)=>{
      reject(new Error("Network problem"));
    });
  }
  return apiFetcher;
}