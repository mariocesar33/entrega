import { Router } from "express";

import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";

import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";


const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliverymentController = new CreateDeliverymanController();
const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryment", createDeliverymentController.handle);
routes.post("/delevery", ensureAuthenticateClient, deliveryController.handle);

routes.get("/delevery/available", findAllAvailableController.handle);
export { routes };