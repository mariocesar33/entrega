import { Router } from "express";

import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/FindAllDeliveries/FindAllDeliveriesDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliverymentController = new CreateDeliverymanController();
const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController();
const upadateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryment", createDeliverymentController.handle);
routes.post("/delevery", ensureAuthenticateClient, deliveryController.handle);

routes.get(
  "/delevery/available", 
  ensureAuthenticateDeliveryman, 
  findAllAvailableController.handle
);

routes.put(
  "/delevery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient, 
  findAllDeliveriesClient.handle
);

routes.get(
  "/deliveryman/deliveries", 
  ensureAuthenticateDeliveryman, 
  findAllDeliveriesDeliveryman.handle
);

routes.put(
  "/delivery/updateEndDate/:id", 
  ensureAuthenticateDeliveryman, 
  upadateEndDateController.handle
);

export { routes };