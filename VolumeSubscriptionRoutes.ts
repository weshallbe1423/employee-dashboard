/**
 * Routes class for VolumeSubscription
 */
import { Routes, routes, swagger, post, body, patch, get, request } from '../common/restapi/RestApi';
import { Message } from '../common/Message';
import { VolumeSubscriptionService } from '../services/VolumeSubscriptionService';
import { VolumeSubscriptionController } from '../controllers/VolumeSubscriptionController';
const swaggerApi = require('swagger-node-express');

const paramTypes = swaggerApi.paramTypes,
    errors = swaggerApi.errors;
@routes
export class VolumeSubscriptionRoutes implements Routes {

    @post({ route: '/api/volumeSubscription' })
    @request({ param: VolumeSubscriptionService.ymlConfig.Routes.ClientContext, prop: VolumeSubscriptionService.ymlConfig.Routes.ClientContext })
    @body({ param: VolumeSubscriptionService.ymlConfig.Routes.Body })
    @swagger({
        type: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.VolumeSubscription,
        notes: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.CreateVolumeSubscription,
        parameters: [
            paramTypes.header(VolumeSubscriptionService.ymlConfig.Routes.Authorization, VolumeSubscriptionService.ymlConfig.Routes.AuthorizationTokenRequired, VolumeSubscriptionService.ymlConfig.Routes.String, true),
            paramTypes.body(VolumeSubscriptionService.ymlConfig.Routes.Body,
                VolumeSubscriptionService.ymlConfig.Routes.RequestBodyRequired,
                VolumeSubscriptionService.ymlConfig.Routes.Object)
        ],
        errorResponses: [
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Body),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Body),
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Authorization),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Authorization)
        ],
        summary: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.CreateVolumeSubscription,
        path: '/api/volumeSubscription'
    })
    createVolumeSubscription(body: any, clientContext: string, _txnId: string) {
        let msg = new Message(_txnId, clientContext, body);
        return new VolumeSubscriptionController().createVolumeSubscription(msg);
    }

    @post({ route: '/api/volumeSubscriptionDetails' })
    @request({ param: VolumeSubscriptionService.ymlConfig.Routes.ClientContext, prop: VolumeSubscriptionService.ymlConfig.Routes.ClientContext })
    @body({ param: VolumeSubscriptionService.ymlConfig.Routes.Body })
    @swagger({
        type: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.VolumeSubscription,
        notes: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.GetVolumeSubscription,
        parameters: [
            paramTypes.header(VolumeSubscriptionService.ymlConfig.Routes.Authorization, VolumeSubscriptionService.ymlConfig.Routes.AuthorizationTokenRequired, VolumeSubscriptionService.ymlConfig.Routes.String, true),
            paramTypes.body(VolumeSubscriptionService.ymlConfig.Routes.Body,
                VolumeSubscriptionService.ymlConfig.Routes.RequestBodyRequired,
                VolumeSubscriptionService.ymlConfig.Routes.Object)
        ],
        errorResponses: [
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Authorization),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Authorization),
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Body),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Body)
        ],
        summary: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.GetVolumeSubscription,
        path: '/api/volumeSubscriptionDetails'
    })
    getVolumeSubscription(body: any, clientContext: string, _txnId: string) {
        let msg = new Message(_txnId, clientContext, body);
        return new VolumeSubscriptionController().getVolumeSubscription(msg);
    }

    @post({ route: '/bulkVolumeSubscription' })
    @request({ param: VolumeSubscriptionService.ymlConfig.Routes.ClientContext, prop: VolumeSubscriptionService.ymlConfig.Routes.ClientContext })
    @body({ param: VolumeSubscriptionService.ymlConfig.Routes.Body })
    @swagger({
        type: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.VolumeSubscription,
        notes: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.BulkVolumeSubscription,
        parameters: [
            paramTypes.header(VolumeSubscriptionService.ymlConfig.Routes.Authorization, VolumeSubscriptionService.ymlConfig.Routes.AuthorizationTokenRequired, VolumeSubscriptionService.ymlConfig.Routes.String, true),
            paramTypes.body(VolumeSubscriptionService.ymlConfig.Routes.Body,
                VolumeSubscriptionService.ymlConfig.Routes.RequestBodyRequired,
                VolumeSubscriptionService.ymlConfig.Routes.Object)
        ],
        errorResponses: [
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Authorization),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Authorization),
            errors.invalid(VolumeSubscriptionService.ymlConfig.Routes.Body),
            errors.notFound(VolumeSubscriptionService.ymlConfig.Routes.Body)
        ],
        summary: VolumeSubscriptionService.ymlConfig.VolumeSubscriptionRoutes.BulkVolumeSubscription,
        path: '/bulkVolumeSubscription'
    })
    bulkVolumeSubscription(body: any, clientContext: string, _txnId: string, file) {
        let msg = new Message(_txnId, clientContext, body, file);
        return new VolumeSubscriptionController().bulkVolumeSubscription(msg);
    }
}
