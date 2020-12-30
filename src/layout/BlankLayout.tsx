import React, { FC } from 'react';
import { RouteType } from '../route/index';
import renderRoutes from '../route/renderRoutes';

const BlankLayout: FC<{routes: Array<RouteType>}> = ({routes}) => {
  console.log('BlankLayout', routes);
  return (
    <div className="blank-layout">
      {renderRoutes(routes)}
    </div>
  );
};

export default BlankLayout;
