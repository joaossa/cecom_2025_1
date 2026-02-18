import { Request, Response } from "express";
import { z } from "zod";
import { PaisCreateDTO, PaisUpdateDTO } from "./pais.dto";
import { PaisService } from "./pais.service";

const service = new PaisService();

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

export class PaisController {
  async listar(_req: Request, res: Response) {
    const paises = await service.listar();
    return res.json(paises);
  }

  async criar(req: Request, res: Response) {
    const parsed = PaisCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    const pais = await service.criar(parsed.data);
    return res.status(201).json(pais);
  }

  async atualizar(req: Request, res: Response) {
    const parsed = PaisUpdateDTO.safeParse(req.body);

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
      const pais = await service.atualizar(id, parsed.data);
      return res.json(pais);
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === "P2025") {
        return res.status(404).json({ message: "Pais nao encontrado" });
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
        return res.status(404).json({ message: "Pais nao encontrado" });
      }

      if (code === "P2003") {
        const vinculos = await service.contarVinculosEndereco(id);

        if (vinculos.totalEndPaciente > 0 || vinculos.totalEndProfissional > 0) {
          return res.status(409).json({
            message:
              "Nao e possivel excluir este pais, pois ele esta relacionado a enderecos de pacientes ou profissionais.",
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
