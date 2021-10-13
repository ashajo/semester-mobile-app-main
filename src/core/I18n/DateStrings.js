import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['sv'] = {
  monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['jan','feb','mar','apr','maj','jun','jul.','aug','sept','okt','nov','dec'],
  dayNames: ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"],
  dayNamesShort: ['M','T','O','T','F','L','S'],
  today: 'Idag',
};
LocaleConfig.defaultLocale = 'sv';

export {LocaleConfig}