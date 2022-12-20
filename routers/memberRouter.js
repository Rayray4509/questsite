import {Router} from "express";
import upload from "../controllers/upload.js";
import questControlllers from "../controllers/questControlllers.js";
import personalDataControllers from "../controllers/personalDataControllers.js";

const router = Router();



router.post("/getListQuest",questControlllers.getListQuest);
router.post("/getQuestByid",questControlllers.getQuestByid);
router.post("/postNewQuest",questControlllers.postNewQuest);
router.post("/delQuest",questControlllers.delQuest);

router.post("/queryQuest",questControlllers.queryQuest);
router.post("/newComment",questControlllers.newComment);

router.post("/uploadImg",upload.uploadImg);
router.post("/getPersonalData",personalDataControllers.getPersonalData);
router.post("/getProfilePicture",personalDataControllers.getProfilePicture);
router.post("/updataPersonalData",personalDataControllers.updataPersonalData);
router.post("/personalListQuest",personalDataControllers.personalListQuest);
router.post("/updateQuestById",personalDataControllers.updateQuestById);
router.post("/changePassword",personalDataControllers.changePassword);











export default{router}


