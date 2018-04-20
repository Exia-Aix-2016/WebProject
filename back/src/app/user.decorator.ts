import { createRouteParamDecorator } from '@nestjs/common';
import { IRawPayload } from '../../../common/interface';

export const User = createRouteParamDecorator((data, req): IRawPayload => {
    return req.user;
});