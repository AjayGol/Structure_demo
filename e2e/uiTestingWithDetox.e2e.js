const { device, element, by } = require('detox');

const goToSignUp = async () => {
  //Start splash screen for next button press
  await element(by.id('btn_get_started')).tap();

  //Enter phone number and press button for get code.
  await element(by.id('phone_number1')).typeText('8523697420');
  await element(by.id('btn_continue')).tap();

  //Skip button press for promo screen
  // await element(by.id('btn_skip')).tap();

  //Sign up button press sign up with otp
  await element(by.id('btn_sign_up_top')).tap();

  //Verify code for sign up
  await element(by.id('first_code')).typeText('0');
  await element(by.id('second_code')).typeText('0');
  await element(by.id('third_code')).typeText('0');
  await element(by.id('four_code')).typeText('0');

  //Enter name and press button
  await element(by.id('name')).typeText('testing');
  await element(by.id('btn_next')).tap();

  //Complete profile button press
  await element(by.id('scroll_down')).scroll(10200, 'down', NaN, 0.99);
  await element(by.id('btn_complete_profile')).tap();
};

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('splash screen launch and start app', async () => {
    await goToSignUp();
  });
});
