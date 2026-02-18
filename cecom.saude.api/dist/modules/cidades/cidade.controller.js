"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CidadeController = void 0;
const zod_1 = require("zod");
const cidade_dto_1 = require("./cidade.dto");
const cidade_service_1 = require("./cidade.service");
const service = new cidade_service_1.CidadeService();
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
class CidadeController {
    async listar(_req, res) {
        const cidades = await service.listar();
        return res.json(cidades);
    }
    async criar(req, res) {
        const parsed = cidade_dto_1.CidadeCreateDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados invalidos",
                errors: zod_1.z.treeifyError(parsed.error),
            });
        }
        try {
            const cidade = await service.criar(parsed.data);
            return res.status(201).json(cidade);
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2002") {
                return res.status(409).json({ message: "Ja existe cidade com esta descricao para a UF informada." });
            }
            throw error;
        }
    }
    async atualizar(req, res) {
        const parsed = cidade_dto_1.CidadeUpdateDTO.safeParse(req.body);
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
            const cidade = await service.atualizar(id, parsed.data);
            return res.json(cidade);
        }
        catch (error) {
            const code = prismaErrorCode(error);
            if (code === "P2025") {
                return res.status(404).json({ message: "Cidade nao encontrada" });
            }
            if (code === "P2002") {
                return res.status(409).json({ message: "Ja existe cidade com esta descricao para a UF informada." });
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
                return res.status(404).json({ message: "Cidade nao encontrada" });
            }
            if (code === "P2003") {
                const vinculos = await service.contarDependencias(id);
                if (vinculos.totalEndPaciente > 0 || vinculos.totalEndProfissional > 0) {
                    return res.status(409).json({
                        message: "Nao e possivel excluir esta cidade, pois ela esta relacionada a enderecos de pacientes ou profissionais.",
                    });
                }
                return res.status(409).json({
                    message: "Nao e possivel excluir esta cidade porque existem bairros, distritos ou enderecos vinculados.",
                });
            }
            throw error;
        }
    }
}
exports.CidadeController = CidadeController;
//# sourceMappingURL=cidade.controller.js.map