import { Request, Response } from "express";
import { z } from "zod";
import { MasterCreateDTO, MasterUpdateDTO } from "./master.dto";
import { MasterService } from "./master.service";

const service = new MasterService();

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

export class MasterController {
  async listar(_req: Request, res: Response) {
    const masters = await service.listar();
    return res.json(masters);
  }

  async criar(req: Request, res: Response) {
    const parsed = MasterCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    const master = await service.criar(parsed.data);
    return res.status(201).json(master);
  }

  async atualizar(req: Request, res: Response) {
    const parsed = MasterUpdateDTO.safeParse(req.body);

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
      const master = await service.atualizar(id, parsed.data);
      return res.json(master);
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === "P2025") {
        return res.status(404).json({ message: "Organizacao Master nao encontrada" });
      }

      throw error;
    }
  }

  async inativar(req: Request, res: Response) {
    let id: number;
    try {
      id = parseIdParam(req);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo invalido" });
    }

    try {
      const master = await service.inativar(id);
      return res.json(master);
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === "P2025") {
        return res.status(404).json({ message: "Organizacao Master nao encontrada" });
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
