import IConfigProps from './IConfigProps';

import dashboardConfig from './modules/dashboard';
import iconConfig from './modules/icon';
import chartConfig from './modules/chart';



const routeConfig = [dashboardConfig, iconConfig, chartConfig];


export {
  IConfigProps,
  routeConfig
}
