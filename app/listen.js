import {
  RNAndroidNotificationListenerHeadlessJsName,
  getPermissionStatus,
} from "react-native-android-notification-listener";

import { AppRegistry } from "react-native";

export async function startListenMessages() {
  // To check if the user has permission
  const status = await getPermissionStatus();
  console.log(status);

  // To open the Android settings so the user can enable it
  RNAndroidNotificationListener.requestPermission();

  /**
   * Note that this method MUST return a Promise.
   * Is that why I'm using an async function here.
   */
  const headlessNotificationListener = async ({ notification }) => {
    /**
     * This notification is a JSON string in the follow format:
     *  {
     *      "time": string,
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ],
     *      "icon": string (base64),
     *      "image": string (base64), // WARNING! THIS MAY NOT WORK FOR SOME APPLICATIONS SUCH TELEGRAM AND WHATSAPP
     *  }
     *
     * Note that these properties depend on the sender configuration so many times a lot of them will be empty
     */

    if (notification) {
      /**
       * You could store the notifications in an external API.
       * I'm using AsyncStorage in the example project.
       */

      console.log(notification);

      fetch();
    }
  };

  /**
   * This should be required early in the sequence
   * to make sure the JS execution environment is setup before other
   * modules are required.
   *
   * Your entry file (index.js) would be the better place for it.
   *
   * PS: I'm using here the constant RNAndroidNotificationListenerHeadlessJsName to ensure
   *     that I register the headless with the right name
   */
  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener
  );
}
