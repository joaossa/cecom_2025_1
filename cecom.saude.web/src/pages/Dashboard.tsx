import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "./Dashboard.css";

type MainView = "inicio" | "configuracoes";
type SettingsView = "master" | "pacientes" | "profissionais" | "usuarios";
type MasterTab = "cadastro" | "listagem";
type SimNao = "S" | "N";

interface MasterItem {
  id: number;
  nome: string;
  dtCadastro: string;
  stInativo: SimNao | null;
}

const masterNomeRegex = /^[\p{L}\p{N} ]+$/u;

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm14.71-9.04a1 1 0 0 0 0-1.41l-1.5-1.5a1 1 0 0 0-1.41 0l-1.17 1.17 3.75 3.75 1.33-1.01z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7zm3-4h6l1 2h4v2H4V5h4l1-2z" />
    </svg>
  );
}

function IconPower() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 3h-2v10h2V3zm-1 19C7 22 3 18 3 13c0-3.5 2-6.6 5-8.1v2.3C6.2 8.4 5 10.6 5 13c0 3.9 3.1 7 7 7s7-3.1 7-7c0-2.4-1.2-4.6-3-5.8V4.9c3 1.5 5 4.6 5 8.1 0 5-4 9-9 9z" />
    </svg>
  );
}

export function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [mainView, setMainView] = useState<MainView>("inicio");
  const [settingsView, setSettingsView] = useState<SettingsView>("master");

  const [masterTab, setMasterTab] = useState<MasterTab>("cadastro");
  const [masters, setMasters] = useState<MasterItem[]>([]);
  const [mastersLoading, setMastersLoading] = useState(false);
  const [mastersError, setMastersError] = useState<string | null>(null);

  const [masterNome, setMasterNome] = useState("");
  const [masterInativo, setMasterInativo] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState<number | null>(null);
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [masterMessage, setMasterMessage] = useState<string | null>(null);
  const [savingMaster, setSavingMaster] = useState(false);
  const [rowActionId, setRowActionId] = useState<number | null>(null);

  const settingsItems = useMemo(
    () => [
      { id: "master" as const, label: "Master", subtitle: "Organizacoes" },
      { id: "pacientes" as const, label: "Pacientes", subtitle: "Cadastro base" },
      { id: "profissionais" as const, label: "Profissionais", subtitle: "Cadastro base" },
      { id: "usuarios" as const, label: "Usuarios", subtitle: "Acesso e perfil" },
    ],
    []
  );

  const fetchMasters = useCallback(async () => {
    setMastersLoading(true);
    setMastersError(null);

    try {
      const response = await api.get<MasterItem[]>("/masters");
      setMasters(response.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (error instanceof Error ? error.message : null) ??
        "Nao foi possivel listar as organizacoes Master.";
      setMastersError(message);
    } finally {
      setMastersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mainView === "configuracoes" && settingsView === "master") {
      void fetchMasters();
    }
  }, [fetchMasters, mainView, settingsView]);

  function validateMasterNome(nome: string) {
    const trimmed = nome.trim();

    if (trimmed.length === 0) {
      return "Informe o nome da organizacao Master.";
    }

    if (trimmed.length > 120) {
      return "O nome deve ter no maximo 120 caracteres.";
    }

    if (!masterNomeRegex.test(trimmed)) {
      return "Use apenas caracteres alfanumericos e espacos.";
    }

    return null;
  }

  function resetMasterForm() {
    setMasterNome("");
    setMasterInativo(false);
    setEditingMasterId(null);
    setNomeError(null);
  }

  function startEdit(master: MasterItem) {
    setEditingMasterId(master.id);
    setMasterNome(master.nome);
    setMasterInativo(master.stInativo === "S");
    setNomeError(null);
    setMasterMessage(null);
    setMasterTab("cadastro");
  }

  async function handleMasterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const error = validateMasterNome(masterNome);
    if (error) {
      setNomeError(error);
      return;
    }

    setSavingMaster(true);
    setNomeError(null);
    setMasterMessage(null);

    const payload = {
      nome: masterNome.trim(),
      stInativo: (masterInativo ? "S" : "N") as SimNao,
    };

    try {
      if (editingMasterId) {
        await api.put(`/masters/${editingMasterId}`, payload);
        setMasterMessage("Organizacao Master atualizada com sucesso.");
      } else {
        await api.post("/masters", payload);
        setMasterMessage("Organizacao Master cadastrada com sucesso.");
      }

      resetMasterForm();
      setMasterTab("listagem");
      await fetchMasters();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (error instanceof Error ? error.message : null) ??
        "Nao foi possivel salvar a organizacao Master.";
      setMasterMessage(message);
    } finally {
      setSavingMaster(false);
    }
  }

  async function handleInativar(master: MasterItem) {
    if (master.stInativo === "S") {
      return;
    }

    setRowActionId(master.id);
    setMasterMessage(null);

    try {
      await api.patch(`/masters/${master.id}/inativar`);
      setMasterMessage("Organizacao Master inativada com sucesso.");
      await fetchMasters();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (error instanceof Error ? error.message : null) ??
        "Nao foi possivel inativar a organizacao Master.";
      setMasterMessage(message);
    } finally {
      setRowActionId(null);
    }
  }

  async function handleExcluir(master: MasterItem) {
    const confirmed = window.confirm(`Excluir a organizacao Master '${master.nome}'?`);

    if (!confirmed) {
      return;
    }

    setRowActionId(master.id);
    setMasterMessage(null);

    try {
      await api.delete(`/masters/${master.id}`);
      setMasterMessage("Organizacao Master excluida com sucesso.");

      if (editingMasterId === master.id) {
        resetMasterForm();
      }

      await fetchMasters();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (error instanceof Error ? error.message : null) ??
        "Nao foi possivel excluir a organizacao Master.";
      setMasterMessage(message);
    } finally {
      setRowActionId(null);
    }
  }

  function formatStatus(stInativo: SimNao | null) {
    return stInativo === "S" ? "Inativo" : "Ativo";
  }

  function formatDate(dateIso: string) {
    const parsed = new Date(dateIso);

    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }

    return parsed.toLocaleString("pt-BR");
  }

  if (loading) {
    return (
      <main className="dashboard-shell">
        <section className="dashboard-loading">Carregando painel...</section>
      </main>
    );
  }

  return (
    <main className="dashboard-shell">
      <div className="dashboard-glow dashboard-glow-left" aria-hidden="true" />
      <div className="dashboard-glow dashboard-glow-right" aria-hidden="true" />

      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <p className="dashboard-eyebrow">Cecom Saude</p>
          <h1>Painel principal</h1>
        </div>

        <nav className="dashboard-main-nav" aria-label="Menu principal">
          <button
            type="button"
            className={`dashboard-main-link ${mainView === "inicio" ? "active" : ""}`}
            onClick={() => setMainView("inicio")}
          >
            Inicio
          </button>
          <button
            type="button"
            className={`dashboard-main-link ${mainView === "configuracoes" ? "active" : ""}`}
            onClick={() => setMainView("configuracoes")}
          >
            Configuracoes
          </button>
        </nav>

        <button type="button" onClick={logout} className="dashboard-logout-btn">
          Logoff
        </button>
      </header>

      <section className="dashboard-content" aria-live="polite">
        {mainView === "inicio" && (
          <>
            <p className="dashboard-copy">
              Sessao autenticada. Use o menu principal para navegar entre as areas do sistema.
            </p>

            <dl className="dashboard-grid" aria-label="Resumo da sessao">
              <div>
                <dt>ID do usuario</dt>
                <dd>{user?.id ?? "-"}</dd>
              </div>
              <div>
                <dt>Perfil</dt>
                <dd>{user?.role ?? "-"}</dd>
              </div>
              <div>
                <dt>Codigo Master</dt>
                <dd>{user?.cdMaster ?? "-"}</dd>
              </div>
            </dl>
          </>
        )}

        {mainView === "configuracoes" && (
          <div className="settings-layout">
            <aside className="settings-menu" aria-label="Tabelas basicas">
              <h2>Tabelas basicas</h2>
              {settingsItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`settings-item ${settingsView === item.id ? "active" : ""}`}
                  onClick={() => setSettingsView(item.id)}
                >
                  <span>{item.label}</span>
                  <small>{item.subtitle}</small>
                </button>
              ))}
            </aside>

            <article className="settings-panel">
              {settingsView === "master" && (
                <>
                  <p className="panel-eyebrow">Tabela selecionada</p>
                  <h3>Master</h3>
                  <p>Cadastro e manutencao de organizacoes Master.</p>

                  <div className="master-tabs" role="tablist" aria-label="Opcoes de Master">
                    <button
                      type="button"
                      role="tab"
                      className={`master-tab-btn ${masterTab === "cadastro" ? "active" : ""}`}
                      aria-selected={masterTab === "cadastro"}
                      onClick={() => setMasterTab("cadastro")}
                    >
                      Cadastro
                    </button>
                    <button
                      type="button"
                      role="tab"
                      className={`master-tab-btn ${masterTab === "listagem" ? "active" : ""}`}
                      aria-selected={masterTab === "listagem"}
                      onClick={() => setMasterTab("listagem")}
                    >
                      Listagem
                    </button>
                  </div>

                  {masterMessage && <p className="master-feedback">{masterMessage}</p>}
                  {mastersError && <p className="master-feedback error">{mastersError}</p>}

                  {masterTab === "cadastro" && (
                    <form className="master-form" onSubmit={handleMasterSubmit}>
                      <label className="master-field">
                        Nome da organizacao
                        <input
                          type="text"
                          value={masterNome}
                          onChange={(event) => setMasterNome(event.target.value)}
                          maxLength={120}
                          placeholder="Digite o nome da organizacao"
                          aria-invalid={!!nomeError}
                          required
                        />
                      </label>

                      {nomeError && <p className="master-field-error">{nomeError}</p>}

                      <label className="master-checkbox">
                        <input
                          type="checkbox"
                          checked={masterInativo}
                          onChange={(event) => setMasterInativo(event.target.checked)}
                        />
                        <span>Inativo (stInativo = S)</span>
                      </label>

                      <div className="master-form-actions">
                        <button type="submit" className="master-primary-btn" disabled={savingMaster}>
                          {savingMaster
                            ? "Salvando..."
                            : editingMasterId
                              ? "Atualizar organizacao"
                              : "Cadastrar organizacao"}
                        </button>

                        {editingMasterId && (
                          <button
                            type="button"
                            className="master-secondary-btn"
                            onClick={resetMasterForm}
                            disabled={savingMaster}
                          >
                            Cancelar edicao
                          </button>
                        )}
                      </div>
                    </form>
                  )}

                  {masterTab === "listagem" && (
                    <div className="master-list-wrap">
                      <div className="master-list-tools">
                        <button
                          type="button"
                          className="master-secondary-btn"
                          onClick={() => void fetchMasters()}
                          disabled={mastersLoading}
                        >
                          {mastersLoading ? "Atualizando..." : "Atualizar lista"}
                        </button>
                      </div>

                      <div className="master-grid" role="table" aria-label="Organizacoes Master cadastradas">
                        <div className="master-grid-row master-grid-head" role="row">
                          <span role="columnheader">Nome</span>
                          <span role="columnheader">Cadastro</span>
                          <span role="columnheader">Status</span>
                          <span role="columnheader">Acoes</span>
                        </div>

                        {masters.length === 0 && !mastersLoading && (
                          <div className="master-grid-empty">Nenhuma organizacao Master cadastrada.</div>
                        )}

                        {masters.map((master) => {
                          const busy = rowActionId === master.id;

                          return (
                            <div className="master-grid-row" role="row" key={master.id}>
                              <span role="cell">{master.nome}</span>
                              <span role="cell">{formatDate(master.dtCadastro)}</span>
                              <span role="cell">{formatStatus(master.stInativo)}</span>
                              <span role="cell" className="master-actions">
                                <button
                                  type="button"
                                  className="icon-btn"
                                  onClick={() => startEdit(master)}
                                  aria-label={`Editar ${master.nome}`}
                                  title="Editar"
                                  disabled={busy}
                                >
                                  <IconEdit />
                                </button>
                                <button
                                  type="button"
                                  className="icon-btn"
                                  onClick={() => void handleInativar(master)}
                                  aria-label={`Inativar ${master.nome}`}
                                  title="Inativar"
                                  disabled={busy || master.stInativo === "S"}
                                >
                                  <IconPower />
                                </button>
                                <button
                                  type="button"
                                  className="icon-btn danger"
                                  onClick={() => void handleExcluir(master)}
                                  aria-label={`Excluir ${master.nome}`}
                                  title="Excluir"
                                  disabled={busy}
                                >
                                  <IconTrash />
                                </button>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {settingsView === "pacientes" && (
                <>
                  <p className="panel-eyebrow">Tabela selecionada</p>
                  <h3>Pacientes</h3>
                  <p>Area pronta para configuracao de estrutura base de pacientes.</p>
                </>
              )}

              {settingsView === "profissionais" && (
                <>
                  <p className="panel-eyebrow">Tabela selecionada</p>
                  <h3>Profissionais</h3>
                  <p>Area pronta para configuracao de estrutura base de profissionais.</p>
                </>
              )}

              {settingsView === "usuarios" && (
                <>
                  <p className="panel-eyebrow">Tabela selecionada</p>
                  <h3>Usuarios</h3>
                  <p>Area pronta para configuracao de acesso e perfil de usuarios.</p>
                </>
              )}
            </article>
          </div>
        )}
      </section>
    </main>
  );
}
