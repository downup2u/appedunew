App.info({
	id: 'youyouxueche.czjcd.com',
	name: '优优学车',
	description: '优优学车，学车好伴侣',
	website: 'http://youyouxueche.czjcd.com',
	version: '0.1.0'
});

App.accessRule('*.czjcd.com/*');
App.accessRule('*');

App.icons({
	'android_ldpi': 'private/android/res/drawable-ldpi/icon.png',
	'android_hdpi': 'private/android/res/drawable-hdpi/icon.png',
	'android_xhdpi': 'private/android/res/drawable-xhdpi/icon.png',
	'iphone': 'private/ios/Resources/icons/icon-60.png',
	'iphone_2x': 'private/ios/Resources/icons/icon-60@2x.png',
	'iphone_3x': 'private/ios/Resources/icons/icon-60@3x.png',
	'ipad': 'private/ios/Resources/icons/icon-76.png',
	'ipad_2x': 'private/ios/Resources/icons/icon-76@2x.png'
});

App.launchScreens({
	'android_ldpi_landscape': 'private/android/res/drawable-land-ldpi/screen.png',
	'android_ldpi_portrait': 'private/android/res/drawable-port-ldpi/screen.png',
	'android_mdpi_landscape': 'private/android/res/drawable-land-mdpi/screen.png',
	'android_mdpi_portrait': 'private/android/res/drawable-port-mdpi/screen.png',
	'android_hdpi_landscape': 'private/android/res/drawable-land-hdpi/screen.png',
	'android_hdpi_portrait': 'private/android/res/drawable-port-ldpi/screen.png',
	'android_xhdpi_landscape': 'private/android/res/drawable-land-xhdpi/screen.png',
	'android_xhdpi_portrait': 'private/android/res/drawable-port-xhdpi/screen.png',
	'iphone': 'private/ios/Resources/splash/Default~iphone.png',
	'iphone_2x': 'private/ios/Resources/splash/Default@2x~iphone.png',
	'iphone5': 'private/ios/Resources/splash/Default-568h@2x~iphone.png',
	'iphone6': 'private/ios/Resources/splash/Default-667h.png',
	'iphone6p_landscape': 'private/ios/Resources/splash/Default-Landscape-736h.png',
	'iphone6p_portrait': 'private/ios/Resources/splash/Default-736h.png',
	'ipad_landscape': 'private/ios/Resources/splash/Default-Landscape~ipad.png',
	'ipad_landscape_2x': 'private/ios/Resources/splash/Default-Landscape@2x~ipad.png',
	'ipad_portrait': 'private/ios/Resources/splash/Default-Portrait~ipad.png',
	'ipad_portrait_2x': 'private/ios/Resources/splash/Default-Portrait@2x~ipad.png'
});

App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
