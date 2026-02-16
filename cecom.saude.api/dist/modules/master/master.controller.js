"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterController = void 0;
const zod_1 = require("zod");
const master_dto_1 = require("./master.dto");
const master_service_1 = require("./master.service");
const service = new master_service_1.MasterService();
function parseIdParam(req) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Codigo invalido");
    }
    return id;
}
function prismaErrorCode(error) {
    if (typeof error === "object" && error !== null && "code" in error) {
        const code = error.code;
        return typeof code === "string" ? code : null;
    }
    return null;
}
class MasterController {
    async listar(_req, res) {
        const masters = await service.listar();
        return res.json(masters);
    }
    async criar(req, res) {
        const parsed = master_dto_1.MasterCreateDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados invalidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        const master = await service.criar(parsed.data);
        return res.status(201).json(master);
    }
    async atualizar(req, res) {
        const parsed = master_dto_1.MasterUpdateDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados invalidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        let id;
        try {
            id = parseIdParam(req);
        }
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
        }
        try {
            const master = await service.atualizar(id, parsed.data);
            return res.json(master);
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2025") {
                return res.status(404).json({ message: "Organizacao Master nao encontrada" });
            }
            throw error;
        }
    }
    async inativar(req, res) {
        let id;
        try {
            id = parseIdParam(req);
        }
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
        }
        try {
            const master = await service.inativar(id);
            return res.json(master);
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2025") {
                return res.status(404).json({ message: "Organizacao Master nao encontrada" });
            }
            throw error;
        }
    }
    async excluir(req, res) {
        let id;
        try {
            id = parseIdParam(req);
        }
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
        }
        try {
            await service.excluir(id);
            return res.status(204).send();
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2025") {
                return res.status(404).json({ message: "Organizacao Master nao encontrada" });
            }
            if (code === "P2003") {
                return res.status(409).json({
                    message: "Nao e possivel excluir. Existem registros vinculados a esta organizacao.",
                });
            }
            throw error;
        }
    }
}
exports.MasterController = MasterController;
//# sourceMappingURL=master.controller.js.map