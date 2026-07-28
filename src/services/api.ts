import { apiClient } from "@/services/apiClient";
import type {
  FieldOption,
  OperatorOption,
  Paginated,
  RuleItem,
  RulePreview,
  SavedRule,
  TypeOption,
} from "@/types";

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post<{ access_token: string }>("/auth/login", {
      email,
      password,
    });
    return data;
  },
  register: async (name: string, email: string, password: string) => {
    const { data } = await apiClient.post("/auth/register", { name, email, password });
    return data;
  },
  googleLogin: async (idToken: string) => {
    const { data } = await apiClient.post<{ access_token: string }>("/auth/google", {
      id_token: idToken,
    });
    return data;
  },
};

export const metadataApi = {
  getTypes: async () => {
    const { data } = await apiClient.get<TypeOption[]>("/types");
    return data;
  },
  getFields: async (typeKey: string) => {
    const { data } = await apiClient.get<FieldOption[]>(`/fields/${typeKey}`);
    return data;
  },
  getValues: async (fieldKey: string, typeKey: string, search?: string) => {
    const { data } = await apiClient.get<string[]>(`/values/${fieldKey}`, {
      params: { type_key: typeKey, search },
    });
    return data;
  },
  getOperators: async () => {
    const { data } = await apiClient.get<OperatorOption[]>("/operators");
    return data;
  },
};

export const rulesApi = {
  preview: async (rules: RuleItem[]) => {
    const { data } = await apiClient.post<RulePreview>("/rules/preview", { rules });
    return data;
  },
  save: async (payload: {
    name: string;
    description?: string;
    rules: RuleItem[];
    is_template: boolean;
  }) => {
    const { data } = await apiClient.post<SavedRule>("/rules/save", payload);
    return data;
  },
  list: async (params: {
    page?: number;
    page_size?: number;
    search?: string;
    templates_only?: boolean;
  }) => {
    const { data } = await apiClient.get<Paginated<SavedRule>>("/rules", { params });
    return data;
  },
  remove: async (id: string) => {
    const { data } = await apiClient.delete(`/rules/${id}`);
    return data;
  },
  update: async (
    id: string,
    payload: Partial<{
      name: string;
      description: string;
      rules: RuleItem[];
      is_template: boolean;
    }>,
  ) => {
    const { data } = await apiClient.put<SavedRule>(`/rules/${id}`, payload);
    return data;
  },
};

export const contactsApi = {
  list: async (params: { page?: number; page_size?: number; search?: string }) => {
    const { data } = await apiClient.get<Paginated<Record<string, unknown>>>("/contacts", {
      params,
    });
    return data;
  },
  filter: async (
    rules: RuleItem[],
    params: { page?: number; page_size?: number },
  ) => {
    const { data } = await apiClient.post<Paginated<Record<string, unknown>>>(
      "/contacts/filter",
      { rules },
      { params },
    );
    return data;
  },
};
