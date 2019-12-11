import { RouteProps } from 'react-router-dom';


export default interface IRouteProps extends RouteProps {
  name: string;
  title: string;
  icon?: string;
  hiddenInMenu?: boolean;
  children?: IRouteProps[];
}
