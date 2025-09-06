import { Router } from "express";
import { getAgendas, createAgenda, getAgendaFiltred, updateAgenda, deleteAgenda } from "./Agenda.controller.js";

const router = Router();

router.post('/create', createAgenda);
router.get('/', getAgendas);
router.get('/filtro/:importancia', getAgendaFiltred);
router.put('/update/:id', updateAgenda);
router.delete('/delete/:id', deleteAgenda);

export default router;