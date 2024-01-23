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
