export const generateQueryRecursive = (field: string, search: string): {} => {
  const splitField = field.split(".");
  if (splitField.length === 1) {
    return {
      [field]: {
        contains: search,
      },
    };
  }
  return {
    [splitField[0]]: {
      ...generateQueryRecursive(splitField.slice(1).join("."), search),
    },
  };
};

export interface AdminProps {
  searchParams: {
    search?: string;
    limit?: string;
    offset?: string;
    filter?: string;
  };
}

export const isAdminUserPass = (
  username: string | undefined,
  password: string | undefined,
): boolean => {
  const au = process.env.ADMIN_USERNAME;
  const ap = process.env.ADMIN_PASSWORD;
  return username === au && password === ap;
};
