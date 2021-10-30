/** @type {Detox.DetoxConfig} */
const config = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  skipLegacyWorkersInjection: true,
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  configurations: {
    'ios.sim.debug': {
      type: 'ios.simulator',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/mobile_app.app',
      build:
        'xcodebuild -workspace ios/mobile_app.xcwodetox test -c ios.sim.releaserkspace -scheme mobile_app -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      device: {
        type: 'iPhone 8',
      },
    },
    'ios.sim.release': {
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/mobile_app.app',
      build:
        'export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/mobile_app.xcworkspace -UseNewBuildSystem=YES -scheme mobile_app -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
      type: 'ios.simulator',
      device: {
        type: 'iPhone 8',
      },
    },
    'android.emu.debug': {
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug; cd -',
      type: 'android.emulator',
      name: 'Nexus_4_API_30',
    },
    'android.emu.release': {
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android; ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release; cd -',
      type: 'android.emulator',
      name: 'Nexus_4_API_30',
    },
  },
};

module.exports = config;
