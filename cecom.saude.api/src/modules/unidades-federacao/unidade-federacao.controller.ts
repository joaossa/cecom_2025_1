import { Request, Response } from "express";
import { z } from "zod";
import { UnidadeFederacaoCreateDTO, UnidadeFederacaoUpdateDTO } from "./unidade-federacao.dto";
import { UnidadeFederacaoService } from "./unidade-federacao.service";

const service = new UnidadeFederacaoService();

function parseIdParam(req: Request) {
  const id = String(req.params.id ?? "").trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(id)) {
    throw new Error("Codigo da UF invalido");
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

export class UnidadeFederacaoController {
  async listar(_req: Request, res: Response) {
    const ufs = await service.listar();
    return res.json(ufs);
  }

  async criar(req: Request, res: Response) {
    const parsed = UnidadeFederacaoCreateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    const uf = await service.criar(parsed.data);
    return res.status(201).json(uf);
  }

  async atualizar(req: Request, res: Response) {
    const parsed = UnidadeFederacaoUpdateDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: z.treeifyError(parsed.error),
      });
    }

    let id: string;
    try {
      id = parseIdParam(req);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo da UF invalido" });
    }

    try {
      const uf = await service.atualizar(id, parsed.data);
      return res.json(uf);
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === "P2025") {
        return res.status(404).json({ message: "UF nao encontrada" });
      }

      throw error;
    }
  }

  async excluir(req: Request, res: Response) {
    let id: string;
    try {
      id = parseIdParam(req);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Codigo da UF invalido" });
    }

    try {
      await service.excluir(id);
      return res.status(204).send();
    } catch (error) {
      const code = prismaErrorCode(error);

      if (code === "P2025") {
        return res.status(404).json({ message: "UF nao encontrada" });
      }

      if (code === "P2003") {
        const vinculos = await service.contarVinculosEndereco(id);

        if (vinculos.totalEndPaciente > 0 || vinculos.totalEndProfissional > 0) {
          return res.status(409).json({
            message:
              "Nao e possivel excluir esta UF, pois ela esta relacionada a enderecos de pacientes ou profissionais.",
          });
        }

        return res.status(409).json({
          message: "Nao e possivel excluir esta UF porque existem cidades vinculadas.",
        });
      }

      throw error;
    }
  }
}
