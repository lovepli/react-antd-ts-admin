import IRoute from './IRoute';

import dashboardRoute from './modules/dashboard';
import iconRoute from './modules/icon';
import chartRoute from './modules/chart';
import blankRoute from './modules/blank';



const routeConfig = [dashboardRoute, iconRoute, chartRoute, blankRoute];


export {
  IRoute,
  routeConfig
}
