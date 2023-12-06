import { Router } from "express";
import { participantsRouter } from "./participants-router";

const router = Router()
router.use(participantsRouter)

export default router