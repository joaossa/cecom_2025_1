import { Request, Response } from "express";
import { z } from "zod";
import { CidadeCreateDTO, CidadeUpdateDTO } from "./cidade.dto";
import { CidadeService } from "./cidade.service";

const service = new CidadeService();

function parseIdParam(req: Request) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Codigo invalido");
  }

  return id;
}

function prismaErrorCode(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : null;
  }

  return null;
}

export class CidadeController {
  async listar(_req: Request, res: Response) {
    const cidades = await service.listar();
    return res.json(cidades);
  }

  async criar(req: Request, res: Response) {
    const parsed = CidadeCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    try {
      const cidade = await service.criar(parsed.data);
      return res.status(201).json(cidade);
    } catch (error) {
      const code = prismaErrorCode(error);

      if (code === "P2002") {
        return res.status(409).json({ message: "Ja existe cidade com esta descricao para a UF informada." });
      }

      throw error;
    }
  }

  async atualizar(req: Request, res: Response) {
    const parsed = CidadeUpdateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    let id: number;
    try {
      id = parseIdParam(req);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
    }

    try {
      const cidade = await service.atualizar(id, parsed.data);
      return res.json(cidade);
    } catch (error) {
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

  async excluir(req: Request, res: Response) {
    let id: number;
    try {
      id = parseIdParam(req);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
    }

    try {
      await service.excluir(id);
      return res.status(204).send();
    } catch (error) {
      const code = prismaErrorCode(error);

      if (code === "P2025") {
        return res.status(404).json({ message: "Cidade nao encontrada" });
      }

      if (code === "P2003") {
        const vinculos = await service.contarDependencias(id);

        if (vinculos.totalEndPaciente > 0 || vinculos.totalEndProfissional > 0) {
          return res.status(409).json({
            message:
              "Nao e possivel excluir esta cidade, pois ela esta relacionada a enderecos de pacientes ou profissionais.",
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
