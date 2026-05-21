// Adicionamos <T> para capturar o tipo do dado de entrada
export const sucessHandlerResponse = <T>(
  data: T,
): { error: boolean; data: T } => {
  return {
    error: false,
    data,
  };
};

export const failedHandlerResponse = ({
  error,
  message,
  type,
  entities,
}: {
  message?: string;
  type?:
    | "ANY"
    | "CREATION"
    | "VIEW"
    | "HANDLING"
    | "LINKING"
    | "UPDATING"
    | "LISTING";
  error: any;
  entities?: string[];
}): { message?: string; type?: string; error: any } => {
  if (error.code) {
    switch (error.code) {
      case "P2000":
        return {
          message: "Valor fornecido é muito longo para o campo",
          error,
          type,
        };

      case "P2001":
        return {
          message: "Registro não encontrado",
          error,
          type,
        };

      case "P2002":
        return {
          message: "Já existe uma entidade com essas propriedades únicas",
          error,
          type,
        };

      case "P2003":
        return {
          message: "Violação de chave estrangeira",
          error,
          type,
        };

      case "P2004":
        return {
          message: "Falha em restrição do banco de dados",
          error,
          type,
        };

      case "P2005":
        return {
          message: "Valor inválido para o campo",
          error,
          type,
        };

      case "P2006":
        return {
          message: "Valor fornecido não é válido para o campo",
          error,
          type,
        };

      case "P2007":
        return {
          message: "Erro na validação de dados",
          error,
          type,
        };

      case "P2008":
        return {
          message: "Falha ao interpretar a query",
          error,
          type,
        };

      case "P2009":
        return {
          message: "Falha ao validar a query",
          error,
          type,
        };

      case "P2010":
        return {
          message: "Erro na execução da query",
          error,
          type,
        };

      case "P2011":
        return {
          message: "Violação de constraint NOT NULL",
          error,
          type,
        };

      case "P2012":
        return {
          message: "Campo obrigatório ausente",
          error,
          type,
        };

      case "P2013":
        return {
          message: "Argumento obrigatório ausente",
          error,
          type,
        };

      case "P2014":
        return {
          message: "Relacionamento inválido entre registros",
          error,
          type,
        };

      case "P2015":
        return {
          message: "Registro relacionado não encontrado",
          error,
          type,
        };

      case "P2016":
        return {
          message: "Erro na interpretação da query",
          error,
          type,
        };

      case "P2017":
        return {
          message: "Os registros não estão conectados",
          error,
          type,
        };

      case "P2018":
        return {
          message: "Registro necessário não encontrado",
          error,
          type,
        };

      case "P2019":
        return {
          message: "Erro de entrada",
          error,
          type,
        };

      case "P2020":
        return {
          message: "Valor fora do intervalo permitido",
          error,
          type,
        };

      case "P2021":
        return {
          message: "Tabela não encontrada no banco de dados",
          error,
          type,
        };

      case "P2022":
        return {
          message: "Coluna não encontrada",
          error,
          type,
        };

      case "P2023":
        return {
          message: "Erro na conversão de dados",
          error,
          type,
        };

      case "P2024":
        return {
          message: "Timeout na conexão com o banco de dados",
          error,
          type,
        };

      case "P2025":
        return {
          message: "Operação falhou pois o registro não foi encontrado",
          error,
          type,
        };

      default:
        return {
          message: "Erro desconhecido no banco de dados",
          error,
          type,
        };
    }
  }

  if (error.message && !message) {
    message = error.message;
  }

  return {
    error,
    message:
      typeof error === "string"
        ? error
        : message
          ? message
          : `Não foi possível completar ${type} ${entities?.join(", ")}`,
    type,
  };
};
