/**
 * @providesModule Answers
 */
// @flow

import analytics from '@react-native-firebase/analytics';
import ReactMoE, { MoEProperties } from 'react-native-moengage';

export const UserEvent = {
  userTrackScreen: function (screenName: string, Event: string) {
    screenName = screenName.split(' ').join('');

    if (Event) {
      analytics().logEvent(screenName, Event);
    } else {
      analytics().logEvent(screenName);
    }

    // forEach(({ screenName, Event }) => {
    // if (Event) {
    //   let properties = new MoEProperties();
    //   properties.addAttribute('page', screenName);
    //   ReactMoE.trackEvent(Event, properties);
    // }
    // });
  },

  MoengageTrackScreen: function (attribute: [], value: [], EventName: string) {
    if (EventName) {
      let properties = new MoEProperties();
      for (let i = 0; i < attribute.length; i++) {
        properties.addAttribute(attribute[i], value[i]);
      }
      ReactMoE.trackEvent(EventName, properties);
    }
  },

};
