import {Router} from "express";
import memberControllers from "../controllers/memberControllers.js";
import personalDataControllers from "../controllers/personalDataControllers.js";

const router = Router();

router.post("/sendEmail",memberControllers.sendEmail);
router.post("/register",memberControllers.register);
router.post("/login",memberControllers.login,memberControllers.getFrontRouterData);
router.post("/logout",memberControllers.logout);
router.post("/forgotPassword",personalDataControllers.forgotPassword);










export default{router}


