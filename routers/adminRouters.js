import {Router} from "express";
import whiteSheetControllers from "../controllers/whiteSheetControllers.js";
import adminUserdata from "../controllers/adminUserdata.js";


const router = Router();

router.post("/addWhiteSheet",whiteSheetControllers.addWhiteSheet);
router.post("/getListWhiteSheet",whiteSheetControllers.getListWhiteSheet);
router.post("/queryWhiteSheet",whiteSheetControllers.queryWhiteSheet);
router.post("/delWhiteSheet",whiteSheetControllers.delWhiteSheet);
router.post("/getListUserData",adminUserdata.getListUserData);
router.post("/queryUserData",adminUserdata.queryUserData);
router.post("/changedServiceStatus",adminUserdata.changedServiceStatus);







export default{router}