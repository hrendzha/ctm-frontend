function castObjValuesToString(obj: Record<string, any>): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);
}

export { castObjValuesToString };
