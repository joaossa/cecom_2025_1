"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisController = void 0;
const zod_1 = require("zod");
const pais_dto_1 = require("./pais.dto");
const pais_service_1 = require("./pais.service");
const service = new pais_service_1.PaisService();
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
class PaisController {
    async listar(_req, res) {
        const paises = await service.listar();
        return res.json(paises);
    }
    async criar(req, res) {
        const parsed = pais_dto_1.PaisCreateDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados invalidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        const pais = await service.criar(parsed.data);
        return res.status(201).json(pais);
    }
    async atualizar(req, res) {
        const parsed = pais_dto_1.PaisUpdateDTO.safeParse(req.body);
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
            const pais = await service.atualizar(id, parsed.data);
            return res.json(pais);
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2025") {
                return res.status(404).json({ message: "Pais nao encontrado" });
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
                return res.status(404).json({ message: "Pais nao encontrado" });
            }
            if (code === "P2003") {
                const vinculos = await service.contarVinculosEndereco(id);
                if (vinculos.totalEndPaciente > 0 || vinculos.totalEndProfissional > 0) {
                    return res.status(409).json({
                        message: "Nao e possivel excluir este pais, pois ele esta relacionado a enderecos de pacientes ou profissionais.",
                    });
                }
                return res.status(409).json({
                    message: "Nao e possivel excluir este pais porque existem cidades vinculadas.",
                });
            }
            throw error;
        }
    }
}
exports.PaisController = PaisController;
//# sourceMappingURL=pais.controller.js.map